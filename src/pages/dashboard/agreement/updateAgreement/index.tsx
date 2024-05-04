import { useEffect, useState } from "react";
import { Container, InputLabel, Button, TextField } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { apiService } from "../../../../server/apiServer";
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

  const [name, setName] = useState("");
  const [currentAgreementFormat, setCurrentAgreementFormat] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const agreementFromApi = await apiService.get(`Agreements/Get/${id}`);
      setName(agreementFromApi?.data?.name);
      setCurrentAgreementFormat(agreementFromApi?.data);
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      const res = await apiService.put(`Agreements/Update/${id}`, {
        name,
        text,
      });
      if (res?.status == 200) {
        toast.success("Uğurla yenilendi!");
        navigate("/panel/agreements");
      } else {
        toast.error("Xəta baş verdi!");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Container maxWidth="xl">
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
          sx={{ width: "50%", mb: 3 }}
          name={"name"}
          value={name}
          style={textStyling}
          onChange={(e) => setName(e.target.value)}
          size="small"
        />

        <div className="w-[50%] mb-6">
          <CKEditor
            config={{
              extraPlugins: [uploadPlugin],
            }}
            editor={ClassicEditor}
            data={currentAgreementFormat?.text}
            onChange={(_, editor) => {
              setText(editor.getData());
            }}
          />
        </div>
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
          <Button variant="contained" onClick={handleSave}>
            Təsdiqlə
          </Button>
        </div>
      </footer>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </>
  );
}
