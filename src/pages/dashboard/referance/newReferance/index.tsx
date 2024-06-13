// @ts-nocheck
import Grid from "@mui/material/Grid";
import {
  Container,
  InputLabel,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import { Form, Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { apiService } from "../../../../server/apiServer";
import { Schema } from "../schema";
import { useTranslation } from "react-i18next";

const textStyling = {
  lineHeight: "16px",
  fontWeight: "400",
  fontSize: "12px",
};

const footer = {
  borderRadius: "2px",
  background: "#F8F9FB",
  display: "flex",
  justifyContent: "end",
  // width: '100%',
  padding: "12px 60px",
};

const initialValues = {
  phone: "",
  city: "",
  email: "",
  name:"",
  note:""
};

export default function CreatePopup() {
  const [isLoading, setIsLoading] = useState(false);

  // ======================
  // Get data from api
  // ======================




  const navigate = useNavigate();
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <CircularProgress
        sx={{ position: "absolute", top: "50%", left: "50%" }}
      />
    );
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={Schema}
        onSubmit={async (values, { setErrors }) => {
          try {
            const res = await apiService.post(
              `/referances/create`,
              values
            );
            if (res?.status == 200) {
              toast.success("Referans uğurla yaradıldı!");
              navigate("/panel/referances");
            } else {
              let errors = res.data.errors;
              // convert to camelCase
              errors = _.mapKeys(errors, (value, key) => {
                return _.camelCase(key);
              });
              setErrors(errors);
            }
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {(props) => (
          <Form
            style={{ backgroundColor: "white" }}
            onSubmit={props.handleSubmit}
          >
            <Container maxWidth="xl">
              <Grid
                container
                spacing={4}
                style={{ marginBottom: "70px", marginTop: "0px" }}
              >
                <Grid item md={3}>
                  {/* Phone */}
                  <>
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ mb: 1 }}
                      style={textStyling}
                    >
              {t("Phone Number")}
                    </InputLabel>
                    <TextField
                      id="outlined-basic"
                      placeholder="Yazın"
                      variant="outlined"
                      sx={{ width: "100%", mb: 3 }}
                      size="small"
                      style={textStyling}
                      onChange={props.handleChange}
                      name={`phone`}
                      value={props.values.phone}
                      error={!!props.errors && !!props.errors.phone}
                      helperText={!!props.errors && props.errors.phone}
                    />
                  </>

                  {/* Email */}
                  <>
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ mb: 1 }}
                      style={textStyling}
                    >
               {  t("Email")}
                    </InputLabel>
                    <TextField
                      id="outlined-basic"
                      placeholder="Yazın"
                      variant="outlined"
                      sx={{ width: "100%", mb: 3 }}
                      size="small"
                      style={textStyling}
                      type="email"
                      onChange={props.handleChange}
                      name={`email`}
                      value={props.values.email}
                      error={!!props.errors && !!props.errors.email}
                      helperText={!!props.errors && props.errors.email}
                    />
                  </>
                </Grid>
                <Grid item md={3}>
                  {/* Phone */}
                  <>
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ mb: 1 }}
                      style={textStyling}
                    >
                      {t("Company")}
                    </InputLabel>
                    <TextField
                      id="outlined-basic"
                      placeholder="Yazın"
                      variant="outlined"
                      sx={{ width: "100%", mb: 3 }}
                      size="small"
                      style={textStyling}
                      onChange={props.handleChange}
                      name={`name`}
                      value={props.values.name}
                      error={!!props.errors && !!props.errors.name}
                      helperText={!!props.errors && props.errors.name}
                    />
                  </>

                  {/* Email */}
                  <>
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ mb: 1 }}
                      style={textStyling}
                    >
                      {t("Adress")}
                    </InputLabel>
                    <TextField
                      id="outlined-basic"
                      placeholder="Yazın"
                      variant="outlined"
                      sx={{ width: "100%", mb: 3 }}
                      size="small"
                      style={textStyling}
                      type="text"
                      onChange={props.handleChange}
                      name={`city`}
                      value={props.values.city}
                      error={!!props.errors && !!props.errors.city}
                      helperText={!!props.errors && props.errors.city}
                    />
                  </>
             
                </Grid>
                <Grid item md={3}>
                <>
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{ mb: 1 }}
                      style={textStyling}
                    >
                      {t("Note")}
                    </InputLabel>
                    <TextField
                      id="outlined-basic"
                      placeholder="Yazın"
                      variant="outlined"
                      sx={{ width: "100%", mb: 3 }}
                      size="small"
                      style={textStyling}
                      type="note"
                      onChange={props.handleChange}
                      name={`note`}
                      value={props.values.city}
                      error={!!props.errors && !!props.errors.city}
                      helperText={!!props.errors && props.errors.city}
                    />
                  </>
                </Grid>
              </Grid>
            </Container>
            <footer style={footer}>
              <div>
                <Button
                  variant="contained"
                  color="inherit"
                  sx={{ mr: 2 }}
                  onClick={() => navigate(-1)}
                >
                  Geri qayıt
                </Button>
                <Button variant="contained" type="submit">
                  Təsdiqlə
                </Button>
              </div>
            </footer>
          </Form>
        )}
      </Formik>

      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </>
  );
}
