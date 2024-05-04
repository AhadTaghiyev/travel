import { useEffect, useState } from "react";
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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  UploadAdapter,
  FileLoader,
} from "@ckeditor/ckeditor5-upload/src/filerepository";

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

function uploadAdapter(loader: FileLoader): UploadAdapter {
  return {
    upload: () => {
      return new Promise(async (resolve, reject) => {
        try {
          const file = await loader.file;
          const formData = new FormData();
          formData.append("ImageFile", file);
          const response = await apiService.postForm(
            `/Blog/UploadImage`,
            formData
          );
          if (response.status === 200) {
            return resolve({
              default: response.data.imagePath,
            });
          }
          reject("Upload failed");
        } catch (error) {
          reject("Upload failed");
        }
      });
    },
    abort: () => {
      console.error("Upload aborted");
    },
  };
}

function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

export default function Index() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [agreementFormat, setagreementFormat] = useState(initialValues);
  const [text, setText] = useState("");

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
              text,
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
              <Grid
                container
                spacing={4}
                style={{ marginTop: 0, marginBottom: "70px" }}
              >
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

                  <div className="w-[50%] mb-6">
                    <CKEditor
                      config={{
                        extraPlugins: [uploadPlugin],
                      }}
                      editor={ClassicEditor}
                      data={props.values.text}
                      onChange={(_, editor) => {
                        setText(editor.getData());
                      }}
                    />
                  </div>

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
