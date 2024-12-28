import { FormControl, ListItemIcon, ListItemText, MenuItem, OutlinedInput, Select, Typography } from "@mui/material";
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
  email: Yup.string().matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Enter correct email format"
  ).required("Mütləqdir!"),
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
      countryCode: "",
      adress: "",
      detail: "",
      subscribeType: null,
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      // Kullanıcı telefon numarasına elle ülke kodu girdiyse, tekrar birleştirme yapma
      const phoneNumber = formik.values.phoneNumber.startsWith(formik.values.countryCode)
        ? formik.values.phoneNumber
        : `${formik.values.countryCode}${formik.values.phoneNumber}`;

      onRegister({ ...values, phoneNumber });
    },
  });
  const navigate = useNavigate();
  const [isLoading, seIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [countryCodes, setCountryCodes] = useState([]);

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
    } else if (res?.status === 409) {
      seIsLoading(false);
      toast.error(res.data.message);
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

  useEffect(() => {
    async function fetchCountryCodes() {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        const codes = data.map(country => ({
          code: `+${country.idd.root?.replace("+", "")}${country.idd.suffixes?.[0] || ""}`,
          label: country.cca2,
          flag: country.flags.svg // Bayrak URL'si
        })).filter(c => c.code); // Boş kodları filtrele

        setCountryCodes(codes);
      } catch (error) {
        console.error("Error fetching country codes:", error);
        toast.error("Unable to load country codes");
      }
    }

    fetchCountryCodes();
  }, []);

  useEffect(() => {
    const matchingCountry = countryCodes.find(country =>
      formik.values.phoneNumber.startsWith(country.code)
    );
    if (matchingCountry && matchingCountry.code !== formik.values.countryCode) {
      formik.setFieldValue("countryCode", matchingCountry.code);
    }
  }, [formik.values.phoneNumber, countryCodes]);


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
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <FormControl sx={{ mr: 1, minWidth: 100 }}>
              <Select
                name="countryCode"
                value={formik.values.countryCode || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="small"
                displayEmpty
                renderValue={(selected) => {
                  if (!selected) {
                    return <em>Select Code</em>;
                  }
                  const selectedCountry = countryCodes.find(c => c.code === selected);
                  return (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <img src={selectedCountry?.flag} alt="" width="20" style={{ marginRight: 8 }} />
                      {selected}
                    </Box>
                  );
                }}
              >
                {countryCodes.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    <ListItemIcon>
                      <img src={country.flag} alt="" width="20" />
                    </ListItemIcon>
                    <ListItemText>{country.code}</ListItemText>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <OutlinedInput
              id="outlined-basic"
              fullWidth
              name="phoneNumber"
              size="small"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              error={formik.touched.phoneNumber && formik.errors.phoneNumber ? true : false}
              placeholder="Enter phone number"
            />
          </Box>
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
                ...(country != "AZ"
                  ? [{ label: "Demo - 7 days", value: "2" }]
                  : []),
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
