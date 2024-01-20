import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { CardActions, CardContent } from '@mui/material';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import {AirwaySchema} from '../airwaySchema';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../../../../server/apiServer';

export default function CreatePopup() {
  const [buttonLoading, setButtonLoading] = useState(false);

  const navigate = useNavigate();

  let { id } = useParams();

  const [data, setData] = useState({name: '', id: id})

  useEffect(()=> {
    try{
        const fetchdata = async () => {
            const res = await apiService.get(`/AirWays/get/${id}`);
            setData(res?.data);
          };
          fetchdata().catch(console.error);
    }catch{console.error}
  }, [])

  const formik = useFormik({
    initialValues: {
      id: data.id,
      name: data.name,
    },
    validationSchema: AirwaySchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors }) => {
      setButtonLoading(true);
      try {
        const res = await apiService.put(`/AirWays/update/${id!}`,values);
        if (res?.status == 200) {
         
          navigate("/panel/airways")
        }else{
          setErrors(res.data?.errors)
        }
      } catch (err) {
        toast.error('Xəta baş verdi!')
      } finally {
        setButtonLoading(false);
      }
    },
  });

  return (
    <Box sx={{display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center'}}>
      <Card sx={{width: '50%', p: 3}}>
        <Typography id="alert-dialog-title">
          {'Yeni hava yolu yarat: '}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <CardContent sx={{p: 0}}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ad"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 3, mt: 2 }}
                  name="name"
                  size='small'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  error={
                    formik.touched.name && formik.errors.name ? true : false
                  }
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{display: 'flex', width: '100%', justifyContent: 'end'}}>
            <Button variant="text" onClick={()=> navigate(-1)}>GO BACK</Button>
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
