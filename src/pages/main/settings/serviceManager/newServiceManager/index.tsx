import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { CardActions, CardContent } from '@mui/material';
import { useFormik } from 'formik';
import {ServiceManagerSchema} from '../serviceManagerSchema';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiService } from '../../../../../server/apiServer';


export default function CreatePopup() {
  const [buttonLoading, setButtonLoading] = useState(false);


  const formik = useFormik({
    initialValues: {
      type: '',
    },
    validationSchema: ServiceManagerSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      setButtonLoading(true);
      try {
        const res = await apiService.post('/ServiceManager/CreateServiceManager',values);
        if (res?.status == 200) {
          toast.success('Xidmət uğurla yaradıldı!');
          resetForm();
        }else{
            setFieldError("type", res.data?.message)
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
          {'Yeni Xidmət yarat: '}
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
                  name="type"
                  size='small'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                  error={
                    formik.touched.type && formik.errors.type ? true : false
                  }
                  helperText={formik.touched.type && formik.errors.type}
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
  );
}

