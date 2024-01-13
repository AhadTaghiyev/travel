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
import {useParams} from 'react-router-dom';
import {PaymentSchema} from '../paymentSchema';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../../../../server/apiServer';

export default function Update() {
  const [buttonLoading, setButtonLoading] = useState(false);

  const navigate = useNavigate();

  let { id } = useParams();

  const [data, setData] = useState({type: '',amount:0, id: id})

  useEffect(()=> {
    try{
        const fetchdata = async () => {
            const res = await apiService.get(`Payments/Get/${id!}`);
            setData(res?.data);
          };
          fetchdata().catch(console.error);
    }catch{console.error}
  }, [])


  const formik = useFormik({
    initialValues: {
        id: data.id,
        type: data.type,
        amount: data.amount
    },
    enableReinitialize: true,
    validationSchema: PaymentSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      setButtonLoading(true);
      try {
        const res = await apiService.put(`Payments/Update/${id!}`, values);
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
          {'Personala düzəliş et: '}
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
                  label="balans"
                  variant="outlined"
                  fullWidth
                  size='small'
                  sx={{ mb: 3, mt: 2 }}
                  name="amount"
                  disabled
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

