import { useState } from "react";
import { Container, InputLabel, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { apiService } from "../../../../server/apiServer";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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

export default function Index() {
  const navigate = useNavigate();
  const [agreementFormats, setAgreementFormats] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [currentAgreementFormat, setCurrentAgreementFormat] = useState(null);

  const getAgreementFormats = async () => {
    const res = await apiService.get("AgreementFormats/GetAll/1");
    if (res.status === 200) {
      setAgreementFormats(res.data.items);
    } else {
      console.error(res);
    }
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
        {/* <InputLabel
          id="demo-simple-select-label"
          sx={{ mb: 1 }}
          style={textStyling}
        >
          Müqavilə formatı
        </InputLabel>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          onChange={(_, value) => setCurrentAgreementFormat(value)}
          onOpen={() => getAgreementFormats()}
          options={agreementFormats}
          style={textStyling}
          sx={{ width: "50%", mb: 2 }}
          getOptionLabel={(option) => option.name}
          size="small"
          renderInput={(params) => <TextField {...params} label="" />}
        /> */}
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
          style={textStyling}
          onChange={(e) => setName(e.target.value)}
          size="small"
        />
        <div className="w-[50%] mb-6">
          <CKEditor
            editor={ClassicEditor}
            data=""
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
