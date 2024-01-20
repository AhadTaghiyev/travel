import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import { CardActions, CardContent } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {PaymentSchema} from '../paymentSchema';
import { apiService } from '../../../../../server/apiServer';
import { useNavigate } from 'react-router-dom';

export default function CreatePopup() {
  const [buttonLoading, setButtonLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      type: '',
      amount:0
    },
    validationSchema: PaymentSchema,
    onSubmit: async (values, {  setErrors }) => {
      setButtonLoading(true);
      try {
        const res = await apiService.post('Payments/Create', values);
        if (res?.status == 200) {
          navigate("/panel/payments")
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
          {'Yeni ödəniş növü yarat: '}
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
                  size='small'
                  sx={{ mb: 3, mt: 2 }}
                  name="type"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.type}
                  error={
                    formik.touched.type && formik.errors.type ? true : false
                  }
                  helperText={formik.touched.type && formik.errors.type}
                />
                 <TextField
                  id="outlined-basic"
                  label="Balans"
                  variant="outlined"
                  fullWidth
                  size='small'
                  sx={{ mb: 3, mt: 2 }}
                  name="amount"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                  error={
                    formik.touched.amount && formik.errors.amount ? true : false
                  }
                  helperText={formik.touched.amount && formik.errors.amount}
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

