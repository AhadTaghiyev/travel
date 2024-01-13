import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Container } from "@mui/material";
import { useFormik } from "formik";
import { CompanySchema } from "../companySchema";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../../../server/apiServer";

export default function Index() {
  const [buttonLoading, setButtonLoading] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      email: "",
    },
    validationSchema: CompanySchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      setButtonLoading(true);
      try {
        const res = await apiService.post("/Company/CreateCompany", values);
        if (res?.status == 200) {
          toast.success("Müştəri uğurla yaradıldı!");
          resetForm();
        } else {
          setErrors(res.data?.errors);
        }
      } catch (err) {
        toast.error("Xəta baş verdi!");
      } finally {
        setButtonLoading(false);
      }
    },
  });

  return (
    <>
      <Container
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Yeni kompaniya yarat: "}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ad"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ mb: 3, mt: 2 }}
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  error={
                    formik.touched.name && formik.errors.name ? true : false
                  }
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Telefon"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 3 }}
                  size="small"
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                  error={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? true
                      : false
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  size="small"
                  value={formik.values.email}
                  error={
                    formik.touched.email && formik.errors.email ? true : false
                  }
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => navigate(-1)}>GO BACK</Button>
            <LoadingButton type="submit" autoFocus loading={buttonLoading}>
              SAVE
            </LoadingButton>
          </DialogActions>
        </form>
      </Container>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </>
  );
}
