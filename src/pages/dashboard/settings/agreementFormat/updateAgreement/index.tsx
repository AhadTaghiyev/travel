// @ts-nocheck
import { useEffect, useState, useRef } from "react";
import { Formik, Form } from "formik";
import {
  Container,
  Grid,
  InputLabel,
  Button,
  TextField,
  FormHelperText,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { apiService } from "../../../../../server/apiServer";
import { IAgreementFormatModel } from "../types";
import PageTitle from "../../../../../components/pages/pageTitle";
import { Editor } from "@tinymce/tinymce-react";
import {
  agreementBreadCrumb,
  homeBreadCrumb,
  updateAgreementBreadCrumb,
} from "../../../../../routes/breadcrumbs";

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

const initialValues: IAgreementFormatModel = {
  name: "",
  text: "",
};

export default function Index() {
  const navigate = useNavigate();

  const { id } = useParams();
  const editorRef = useRef(null);

  const [agreementFormat, setagreementFormat] = useState(initialValues);

  useEffect(() => {
    const fetchData = async () => {
      const agreementFormatFromApi = await apiService.get(
        `AgreementFormats/Get/${id}`
      );
      setagreementFormat(agreementFormatFromApi.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Formik
        initialValues={agreementFormat}
        enableReinitialize={true}
        onSubmit={async (values, { setErrors }) => {
          try {
            const res = await apiService.put(`/AgreementFormats/Update/${id}`, {
              ...values,
              text: editorRef.current.getContent(),
            });
            if (res?.status == 200) {
              toast.success("Uğurla yaradıldı!");
              navigate("/panel/agreementformats");
            } else {
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
                    Müqavilə adı
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    sx={{ width: "100%", mb: 1 }}
                    name={"name"}
                    value={props.values.name}
                    style={textStyling}
                    onChange={props.handleChange}
                    size="small"
                  />
                  {props.errors && props.touched.name && (
                    <>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.name}
                      </FormHelperText>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.name}
                      </FormHelperText>
                    </>
                  )}
                </Grid>
                <Grid item md={12}>
                  <InputLabel
                    id="demo-simple-select-label"
                    sx={{ mb: 1 }}
                    style={textStyling}
                  >
                    Müqavilə
                  </InputLabel>
                  <Editor
                    apiKey="ows56ugyfwkmx9qarju0k2ygovl2zyuq5byax7cs5th0cwed"
                    initialValue={props.values.text}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    onChange={() =>
                      props.handleChange({
                        name: "text",
                        value: editorRef.current.getContent(),
                      })
                    }
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />

                  {props.errors && props.touched.text && (
                    <>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.text}
                      </FormHelperText>
                      <FormHelperText sx={{ color: "red" }}>
                        {props.errors.text}
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
    </>
  );
}
