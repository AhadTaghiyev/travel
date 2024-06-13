import { useState } from "react";
import {
  Container,
  InputLabel,
  Button,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { apiService } from "../../../../server/apiServer";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  UploadAdapter,
  FileLoader,
} from "@ckeditor/ckeditor5-upload/src/filerepository";
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
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const { t } = useTranslation();
  const [currentAgreementFormat, setCurrentAgreementFormat] = useState(null);
  const [agreementFormats, setAgreementFormats] = useState([]);
  const getAgreementFormats = async () => {
    const res = await apiService.get("AgreementFormats/GetAll/1");
    if (res.status === 200) {
      setAgreementFormats(res.data.items);
    } else {
      console.error(res);
    }
  };
  const handlechange = (data) => {
    setName(data.name);
    setCurrentAgreementFormat(data);
  };

  const handleSave = async () => {
    try {
      const res = await apiService.post("Agreements/Create", {
        name,
        text,
      });
      if (res?.status == 200) {
        toast.success("Uğurla yaradıldı!");
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
          {t("Müqavilə formatı")}
        </InputLabel>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          onChange={(_, value) => handlechange(value)}
          onOpen={() => getAgreementFormats()}
          options={agreementFormats}
          style={textStyling}
          sx={{ width: "50%", mb: 2 }}
          getOptionLabel={(option) => option.name}
          size="small"
          renderInput={(params) => <TextField {...params} label="" />}
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
