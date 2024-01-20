import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";
import { CardActions, CardContent } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { ServiceManagerSchema } from "../serviceManagerSchema";
import { CircularProgress } from "@mui/material";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../../../../server/apiServer";

export default function Update() {
  const [buttonLoading, setButtonLoading] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const [data, setData] = useState({ type: "", id: id });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      (async () => {
        const res = await apiService.get(`/Services/Get/${id!}`);
        setData(res?.data?.data);
      })();
    } catch (err) {
      console.log("🚀 ~ file: index.tsx:38 ~ useEffect ~ err:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      id: data.id,
      type: data.type,
    },
    enableReinitialize: true,
    validationSchema: ServiceManagerSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      setButtonLoading(true);
      try {
        const res = await apiService.put(`/Services/Update/${id!}`, values);
        if (res?.status == 200) {
          toast.success("Xidmət uğurla Yeniləndi!");
          resetForm();
        } else {
          setFieldError("type", res.data?.message);
        }
      } catch (err) {
        toast.error("Xəta baş verdi!");
      } finally {
        setButtonLoading(false);
      }
    },
  });

  if (isLoading) {
    return (
      <CircularProgress
        sx={{ position: "absolute", top: "50%", left: "50%" }}
      />
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "80vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ width: "50%", p: 3 }}>
        <Typography id="alert-dialog-title">
          {"Xidmət üzərində düzəliş et: "}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <CardContent sx={{ p: 0 }}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ad"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 3, mt: 2 }}
                  name="type"
                  size="small"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                  error={
                    formik.touched.type && formik.errors.type ? true : false
                  }
                  helperText={formik.touched.type && formik.errors.type}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "end",
            }}
          >
            <Button variant="text" onClick={() => navigate(-1)}>
              GO BACK
            </Button>
            <LoadingButton type="submit" autoFocus loading={buttonLoading}>
              SAVE
            </LoadingButton>
          </CardActions>
        </form>
      </Card>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </Box>
  );
}
