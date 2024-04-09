import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import {
  Container,
  Grid,
  InputLabel,
  Button,
  TextField,
  FormHelperText,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { apiService } from "../../../server/apiServer";
import { MuiFileInput } from "mui-file-input";
import { IEmailModel } from "./types";
import { useTranslation } from "react-i18next";
import CustomTextField from "@/components/custom/input";

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

const initialValues: IEmailModel = {
  body: "",
  attachments: [],
  subject: "",
  toEmail: "",
};

export default function index() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = async (values, { setErrors }) => {
    try {
      const res = await apiService.postForm(`Email/SendMailToPersons`, values);
      if (res?.status == 200) {
        toast.success("Uğurla yaradıldı!");
        navigate("/panel/documents");
      } else {
        console.log(res);
        setErrors(res.data.errors);
      }
    } catch (err) {
      toast.error("Xəta baş verdi");
    }
  };

  return (
    <div className="mx-1 p-4 bg-white shadow-md min-h-[500px]">
      <h1 className="text-black text-4xl font-bold pb-4 border-b border-solid border-[#1c29400f]">
        {t("Send Email")} {/** TODO: translate */}
      </h1>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        // validationSchema={OtherServiceSiteSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 items-center">
              <div className="w-full">
                <CustomTextField
                  name="toEmail"
                  type="text"
                  label={t("Email")}
                  value={values.toEmail}
                  change={handleChange}
                  hasErrorMessages={!!errors.toEmail && !!touched.toEmail}
                  errorMessages={[t(errors.toEmail?.toString())]}
                />
              </div>
              <div className="w-full">
                <CustomTextField
                  name="subject"
                  type="text"
                  label={t("Subject")} // TODO: translate
                  value={values.subject}
                  change={handleChange}
                  hasErrorMessages={!!errors.subject && !!touched.subject}
                  errorMessages={[t(errors.subject?.toString())]}
                />
              </div>
              <div className="w-full">
                <CustomTextField
                  name="attachments"
                  type="file"
                  label={t("Attachments")} // TODO: translate
                  value={values.attachments}
                  change={handleChange}
                  hasErrorMessages={
                    !!errors.attachments && !!touched.attachments
                  }
                  errorMessages={[t(errors.attachments?.toString())]}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>

      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setErrors }) => {
          try {
            const res = await apiService.postForm(
              `Email/SendMailToPersons`,
              values
            );
            if (res?.status == 200) {
              toast.success("Uğurla yaradıldı!");
              navigate("/panel/documents");
            } else {
              console.log(res);
              setErrors(res.data.errors);
            }
          } catch (err) {
            toast.error("Xəta baş verdi");
          }
        }}
        render={(props) => (
          <Form>
            <Container maxWidth="xl">
              <Grid container spacing={4} style={{ marginBottom: "70px" }}>
                <Grid item md={3}>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Email
                  </InputLabel>
                  <TextField
                    multiline
                    id="outlined-basic"
                    variant="outlined"
                    sx={{ width: "100%", mb: 1 }}
                    name={"toEmail"}
                    value={props.values.toEmail}
                    style={textStyling}
                    onChange={props.handleChange}
                    size="small"
                  />
                  {props.errors && props.touched.toEmail && (
                    <>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.toEmail}
                      </FormHelperText>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.toEmail}
                      </FormHelperText>
                    </>
                  )}
                </Grid>
                <Grid item md={3}>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Subject
                  </InputLabel>
                  <TextField
                    multiline
                    id="outlined-basic"
                    variant="outlined"
                    sx={{ width: "100%", mb: 1 }}
                    name={"subject"}
                    value={props.values.subject}
                    style={textStyling}
                    onChange={props.handleChange}
                    size="small"
                  />
                  {props.errors && props.touched.subject && (
                    <>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.subject}
                      </FormHelperText>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.subject}
                      </FormHelperText>
                    </>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Attachments
                  </InputLabel>
                  <MuiFileInput
                    name="file"
                    value={
                      props.values.attachments![
                        props.values.attachments!.length - 1
                      ]
                    }
                    onChange={(newValue) => {
                      const event = {
                        target: {
                          name: `attachments`,
                          value: [...props.values.attachments!, newValue],
                        },
                      };
                      props.handleChange(event);
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Body
                  </InputLabel>
                  <TextField
                    multiline
                    maxRows={5}
                    minRows={5}
                    id="outlined-basic"
                    variant="outlined"
                    sx={{ width: "100%", mb: 1 }}
                    name={"body"}
                    value={props.values.body}
                    style={textStyling}
                    onChange={props.handleChange}
                    size="small"
                  />
                  {props.errors && props.touched.body && (
                    <>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.body}
                      </FormHelperText>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.body}
                      </FormHelperText>
                    </>
                  )}
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
      />
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </div>
  );
}
