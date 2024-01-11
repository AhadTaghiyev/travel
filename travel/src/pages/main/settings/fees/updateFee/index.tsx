import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { CardActions, CardContent } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiService } from '../../../../../server/apiServer';
import { useParams } from 'react-router-dom';

export default function Index() {

    const [buttonLoading, setButtonLoading] = useState(false);
    const {id} = useParams();
    const [fee, setFee] = useState({name: ''});

    useEffect(()=> {

        fetchData();

        async function fetchData(){
            try{
                const res = await apiService.get(`Fee/GetById/${id}`)
                setFee(res.data.data)

            }catch (err) {
                toast.error('Xəta baş verdi!')
            }
        }
    }, [])

    const formik = useFormik({
        initialValues: fee,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm, setErrors }) => {
        setButtonLoading(true);
        try {
            const res = await apiService.post(`/Fee/UpdateFee/${id}`, values);
            if (res?.status == 200) {
            toast.success('Xərc uğurla yenilendi!');
            resetForm();
            }else{
            setErrors(res.data?.errors)
            }
        } catch (err) {
            toast.error('Xəta baş verdi!')
        } finally {
            setButtonLoading(false);
        }
        }  
    });


  return (
    <Box sx={{display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center'}}>
      <Card sx={{width: '50%', p: 3}}>
        <Typography id="alert-dialog-title">
          {'Yeni xərc yarat: '}
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
           
            <LoadingButton type="submit" autoFocus loading={buttonLoading}>
              SAVE
            </LoadingButton>
          </CardActions>
        </form>
      </Card>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </Box>
  )
}

