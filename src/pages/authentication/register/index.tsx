import { OutlinedInput, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Cookies from "universal-cookie";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import CustomSelect from "@/components/custom/select";

import { userService } from "@/server/systemUserServer";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Mütləqdir!"),
  email: Yup.string().required("Mütləqdir!"),
  phoneNumber: Yup.string().required("Mütləqdir!"),
  adress: Yup.string().optional(),
  detail: Yup.string().optional(),
  subscribeType: Yup.string().required("Mütləqdir!"),
});

const cookies = new Cookies();

export default function Index() {
  const navigate = useNavigate();

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

  const [isLoading, seIsLoading] = useState(false);

  const onRegister = async (values) => {
    console.log(values);

    seIsLoading(true);
    const res = await userService.register(values);
    console.log(res);

    // if (res?.statusCode === 200) {
    // } else {
    //   seIsLoading(false);
    //   toast.error("Password ve ya Username yalnisdi!");
    // }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", alignItems: "center", height: "100%" }}
    >
      <form onSubmit={formik.handleSubmit}>
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
                { label: "Aylıq - 120 USD", value: "0" },
                { label: "Illik - 1200 USD", value: "1" },
                { label: "Demo - 1 həftə", value: "2" },
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
      </form>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </Container>
  );
}
