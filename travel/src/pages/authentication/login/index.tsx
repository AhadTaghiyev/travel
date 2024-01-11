import {useState} from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { userService } from '../../../server/systemUserServer';
import { OutlinedInput, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';


const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Mütləqdir!'),
  password: Yup.string()
    .required('Mütləqdir!'),
});

export default function Index() {

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      onLogin(values.username, values.password)
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, seIsLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onLogin = async (username:string, password:string) => {
    seIsLoading(true)
    const res = await userService.login(username, password);
    if(res?.statusCode === 200){
      localStorage.setItem("token", res.accessToken);
      localStorage.setItem("role", res.role);
      localStorage.setItem('username', username);
      // getUser();
      if(res.role === 'Admin'){
        navigate('/admin');
      }else{
        navigate('/panel');
      }
    }else{
      console.log('here')
      seIsLoading(false)
      toast.error('Password ve ya Username yalnisdi!');
    }
  }
  

  return (
    <Container maxWidth="sm" sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant='h4' sx={{mb: 5}}>Sign In</Typography>
        <Typography variant='body1' sx={{mb: 4}}>Welcome back! Please enter your details.</Typography>
        <Box>
          <Typography variant='body2' sx={{mb: 1, pl: 3}}>Username</Typography>
          <OutlinedInput id="outlined-basic" fullWidth sx={{mb: 3}}
            name = 'username'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            error={
              formik.touched.username && formik.errors.username ? true : false
            }
          />
        </Box>
        <Box sx={{mb: 4}}>
          <Typography variant='body2' sx={{mb: 1, pl: 3}}>Password</Typography>
          <OutlinedInput id="outlined-basic1" fullWidth sx={{mb: 2}}
            name='password'
            type={showPassword ? 'text' : 'password'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={
              formik.touched.password && formik.errors.password ? true : false
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Link to="/auth/changePassword" style={{textDecoration: 'none', color: 'black'}}>
            <Typography variant='body2'>Change password</Typography>
          </Link>
        </Box>
        <Button type="submit" variant='contained' disabled={isLoading}  fullWidth >{isLoading?"Loading...":"Login"}</Button>
      </form>
      <ToastContainer position="top-right" autoClose={3000}></ToastContainer>
    </Container>
  )
}
