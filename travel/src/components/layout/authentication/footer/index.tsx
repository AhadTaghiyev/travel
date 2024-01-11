import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

export default function index() {
  return (
    <Box sx={{bgcolor: 'white', borderTop: '1px solid #EBEDF0', position: 'fixed', bottom: '0px', width: '100%'}}>
        <Container maxWidth="xl">
        <Toolbar>
            <Typography variant="body2" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                © 2023 Travvaco. Please review our Privacy policy , Cookie Policy and Terms of Service .
            </Typography>
        </Toolbar>
        </Container>
    </Box>
  )
}
