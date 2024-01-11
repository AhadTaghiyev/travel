import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import bubbleBlue from '../../../../assets/bubbleBlue.png';

import styles from './navbar.module.css';


const pages = ['FAQ', 'Haqqımızda', 'Bizimlə əlaqə'];

export default function Index() {
  return (
    <>
      <AppBar position="fixed" color="transparent" sx={{backgroundColor: 'white'}}>
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <img src={bubbleBlue}/>
              <h3 className={styles.logoText}>Travacco</h3>
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex', ml: 5 }}>
              {pages.map((page) => (
                <Link
                  to="/panel"
                  key={page}
                  style={{
                    color: 'black',
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '400',
                    lineHeight: '16px',
                    marginRight: '30px',
                    textDecoration: 'none',
                  }}
                >
                  {page}
                </Link>
              ))}
            </Box>
            
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
