import { Container } from "@mui/system";
import {  useState } from "react";
import "draft-js/dist/Draft.css";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import { apiService } from "../../../../../server/apiServer";
import { ToastContainer, toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const footer = {
  borderRadius: "2px",
  background: "#F8F9FB",
  display: "flex",
  justifyContent: "end",
  padding: "12px 60px",
};

const textStyling = {
  lineHeight: "16px",
  fontWeight: "400",
  fontSize: "12px",
};

async function saveData(obj: any) {
  const res = await apiService.post("AgreementFormats/Create", obj);
  return res;
}

export default function Index() {
  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleSave = async () => {
      try {
        const res = await saveData({
          name: name,
          text: text,
        });
        if (res.status === 200) {
          toast.success("Uğurla yaradıldı!");
          navigate("/panel/agreementFormats");
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
          Müqavilə formatı adı
        </InputLabel>
        <TextField
          required
          id="outlined-basic"
          variant="outlined"
          sx={{ width: "50%", mb: 1 }}
          value={name}
          style={textStyling}
          onChange={(e) => setName(e.target.value)}
          size="small"
        />
        {/* <Editor
          apiKey="ows56ugyfwkmx9qarju0k2ygovl2zyuq5byax7cs5th0cwed"
          onInit={(evt, editor) => (editorRef.current = editor)}
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
        /> */}

<div className="w-[50%] mb-6">
          <CKEditor
            editor={ClassicEditor}
            data={""}
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
