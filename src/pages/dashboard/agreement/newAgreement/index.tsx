// @ts-nocheck
import { useRef, useState } from 'react';
import { IAgreementModel } from '../types';
import {
  Container,
  InputLabel,
  Button,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { apiService } from '../../../../server/apiServer';
import Autocomplete from '@mui/material/Autocomplete';
import { Editor } from '@tinymce/tinymce-react';

import PageTitle from '../../../../components/pages/pageTitle';
import { agreementBreadCrumb, homeBreadCrumb, newAgreementBreadCrumb } from '../../../../routes/breadcrumbs';

const textStyling = {
  lineHeight: '16px',
  fontWeight: '400',
  fontSize: '12px',
};

const footer = {
  borderRadius: '2px',
  background: '#F8F9FB',
  display: 'flex',
  justifyContent: 'end',
  // width: '100%',
  padding: '12px 60px',
};

const initialValues: IAgreementModel = {
  name: '',
  text: ''
};

export default function Index() {
  const navigate = useNavigate();

  const editorRef = useRef(null);

  const [agreementFormats, setAgreementFormats] = useState([]);
  const [name, setName] = useState('');
  const [currentAgreementFormat, setCurrentAgreementFormat] = useState(null);

  const getAgreementFormats = async ()=> {
    const res = await apiService.get('AgreementFormats/GetAll/1');
        if(res.status === 200){
          setAgreementFormats(res.data.items);
        }else{
          console.error(res);
        }
  }

  const handleSave = async () => {
    try{
      const res = await apiService.post('Agreements/Create', {name: name, text: editorRef.current.getContent()});
      if (res?.status == 200) {
        toast.success('Uğurla yaradıldı!');
        navigate('/panel/agreements');
      } else {
        toast.error('Xəta baş verdi!');
      }
    }catch(err){
      console.error(err);
    }
  }
  return (
    <>
      <Container maxWidth="xl">
        <InputLabel
          id="demo-simple-select-label"
          sx={{ mb: 1 }}
          style={textStyling}
        >
          Müqavilə formatı
        </InputLabel>
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            onChange={(event, value)=> setCurrentAgreementFormat(value)}
            onOpen={() => getAgreementFormats()}
            options={agreementFormats}
            style={textStyling}
            sx={{ width: '50%', mb: 2}}
            getOptionLabel={(option) => option.name}
            size="small"
            renderInput={(params) => <TextField {...params} label=""/>}
        />
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
          sx={{ width: '50%', mb: 3 }}
          name={'name'}
          style={textStyling}
          onChange={(e)=>setName(e.target.value)}
          size="small"
        />
        <Editor
          apiKey='emglxjwpj34s4n14w7kfzdvj9r5u9wk9ksbgqgn4s8e19wtw'
          initialValue={currentAgreementFormat?.text}
          onInit={(evt, editor) => editorRef.current = editor}
          init={{
          height: 500,
          menubar: false,
          plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
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
