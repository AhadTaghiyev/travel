import { OutlinedInput, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
// import Cookies from "universal-cookie";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import CustomSelect from "@/components/custom/select";

import { userService } from "@/server/systemUserServer";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/custom/loading";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Mütləqdir!"),
  email: Yup.string().required("Mütləqdir!"),
  phoneNumber: Yup.string().required("Mütləqdir!"),
  adress: Yup.string().optional(),
  detail: Yup.string().optional(),
  subscribeType: Yup.string().required("Mütləqdir!"),
});

// const cookies = new Cookies();

export default function Index() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      adress: "",
      detail: "",
      subscribeType: null,
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      onRegister(values);
    },
  });
  const navigate = useNavigate();
  const [isLoading, seIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState("");

  const onRegister = async (values) => {
    seIsLoading(true);
    const res = await userService.register(values, ipAddress);

    if (res?.status === 200) {
      seIsLoading(false);
      toast.success("Registered successfully!");
      if (res.data == 1) {
        alert("You have registered successfully please check your email")
        navigate("/auth/login")
      } else {

        window.location.replace(res.data);
      }
    } else {
      seIsLoading(false);
      toast.error("Something went wrong!");
    }
  };

  const [country, setCountry] = useState(null)
  useEffect(() => {
    fetch("https://jsonip.com/")
      .then(res => res.json())
      .then(data => {
        setIpAddress(data.ip);
        fetch(`https://api.iplocation.net/?ip=${data.ip}`)
          .then(resIp => resIp.json())
          .then(dataIp => { setCountry(dataIp.country_code2) })
      })
  }, [])

  useEffect(() => {
    console.log('country: ' + country);
    if (country) {
      setFormLoading(true);
    }
  }, [country])


  return (
    <Container

      maxWidth="sm"
      sx={{ display: "flex", alignItems: "center", height: "100%" }}
    >
      {formLoading ? (<form onSubmit={formik.handleSubmit}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Register
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Welcome to Travacco. Please register to continue.
        </Typography>
        <Box>
          <Typography variant="body2">Company Name</Typography>
          <OutlinedInput
            id="outlined-basic"
            fullWidth
            sx={{ mb: 1 }}
            name="name"
            size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name ? true : false}
          />
        </Box>
        <Box>
          <Typography variant="body2">Email</Typography>
          <OutlinedInput
            id="outlined-basic"
            fullWidth
            sx={{ mb: 1 }}
            name="email"
            size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email ? true : false}
          />
        </Box>
        <Box>
          <Typography variant="body2">Phone Number</Typography>
          <OutlinedInput
            id="outlined-basic"
            fullWidth
            sx={{ mb: 1 }}
            name="phoneNumber"
            size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            error={
              formik.touched.phoneNumber && formik.errors.phoneNumber
                ? true
                : false
            }
          />
        </Box>
        <Box>
          <Typography variant="body2">Address</Typography>
          <OutlinedInput
            id="outlined-basic"
            fullWidth
            sx={{ mb: 1 }}
            name="adress"
            size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.adress}
            error={formik.touched.adress && formik.errors.adress ? true : false}
          />
        </Box>
        <Box>
          <Typography variant="body2">Detail</Typography>
          <OutlinedInput
            id="outlined-basic"
            fullWidth
            sx={{ mb: 1 }}
            name="detail"
            size="small"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.detail}
            error={formik.touched.detail && formik.errors.detail ? true : false}
          />
        </Box>
        <Box>
          <div className="w-full">
            <CustomSelect
              label={"Subscribe Type"}
              optionLabel="name"
              value={formik.values.subscribeType}
              change={(value) =>
                formik.setFieldValue(`subscribeType`, value ?? null)
              }
              hasErrorMessages={
                !!formik.errors.subscribeType && !!formik.touched.subscribeType
              }
              staticOptions={[
                { label: `Monthly - ${country == "AZ" ? "90 AZN" : "90 USD"} `, value: "0" },
                { label: "Demo - 7 day", value: "2" },
              ]}
              errorMessages={[formik.errors.subscribeType?.toString()]}
            />
          </div>
        </Box>
        <Button
          type="submit"
          variant="contained"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>) : (<Loading />)}
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </Container>
  );
}
