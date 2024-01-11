// @ts-nocheck
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import {AiOutlineDown} from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {Menu, MenuItem, Typography} from '@mui/material';
import { userService } from '../../../../../server/systemUserServer';
import { BiLogOut } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
// const { i18n } = useTranslation();
const pages = ['FAQ', 'Haqqımızda', 'Bizimlə əlaqə'];

interface NavbarProp {
  isAdmin? : boolean | null
}

export default function Navbar({isAdmin} : NavbarProp) {
  // ========================
  // Get User values
  // ========================

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  const role = localStorage.getItem("role")
  const userName= localStorage.getItem('username')
  
  // ========================
  // Get User values
  // ========================
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = ()=>{
    userService.logout();
    navigate('/auth')
  }
  return (
    <AppBar color="default" sx={{right: '0px', position: 'fixed', width: '80%'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {
            !isAdmin ? (
              <Box sx={{ flexGrow: 1, display: 'flex' }}>
                {pages.map((page) => (
                  <Link
                    to="/panel"
                    key={page}
                    style={{ color: 'black', display: 'block', fontSize: '12px', fontWeight: '400', lineHeight: '16px', marginRight: '30px', textDecoration: 'none'}}
                  >
                    {page}
                  </Link>
                ))}

<div>
        <button onClick={() => changeLanguage('en')}>EN</button>
        <button onClick={() => changeLanguage('az')}>AZ</button>
        <button onClick={() => changeLanguage('ru')}>RU</button>
      </div>
              </Box>

                

            ) : (
              <Box sx={{ flexGrow: 1}}></Box>
            )
          }
          <Box sx={{ flexGrow: 0 }}>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Box sx={{ marginRight: '12px'}}>
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <IconButton sx={{fontSize: '12px'}}
                    onClick={handleClick}
                    >
                      <AiOutlineDown/>
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={handleLogout}>
                        <BiLogOut/>
                           <Typography sx={{mx:4}}>Çıxış et</Typography>
                        </MenuItem>
                    </Menu>
                    <h6 style={{fontSize: '12px', lineHeight: '16px', fontWeight: '400'}}>{userName}</h6>
                  </Box>
                  <p style={{color: '#BABABA', textAlign: 'right', fontSize: '12px', fontWeight: '400', lineHeight: '16px'}}>{role}</p>
                </Box>
                <IconButton sx={{ p: 0 }}>
                  <Avatar variant='square' alt={userName} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
