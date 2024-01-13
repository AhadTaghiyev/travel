import {useState} from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { OutlinedInput, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl } from '@mui/base';


export default function Index() {

  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(password)
  };


  return (
    <Container maxWidth="sm" sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
      <FormControl>
        <Typography variant='h4' sx={{mb: 5}}>Change Password</Typography>
        <Box>
          <Typography variant='body2' sx={{mb: 1, pl: 3}}>Current password</Typography>
          <OutlinedInput id="outlined-basic" fullWidth sx={{mb: 2}} onChange={(e)=> setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
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
        </Box>
        <Box>
          <Typography variant='body2' sx={{mb: 1, pl: 3}}>New password</Typography>
          <OutlinedInput id="outlined-basic" fullWidth sx={{mb: 2}} onChange={(e)=> setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
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
        </Box>
        <Box sx={{mb: 4}}>
          <Typography variant='body2' sx={{mb: 1, pl: 3}}>New password</Typography>
          <OutlinedInput id="outlined-basic" fullWidth sx={{mb: 2}} onChange={(e)=> setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
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
        </Box>
        <Button type="submit" variant='contained' fullWidth >Save</Button>
      </FormControl>
    </Container>
  )
}
