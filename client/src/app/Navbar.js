import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { gapi } from 'gapi-script'
import decode from 'jwt-decode'

import { logOut } from '../features/Auth/AuthSlice';

const LinkTitle = styled(Link)({
  textDecoration: 'none',
  color: "inherit"
})

export default function Navbar() {
  const [user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')))

  const dispatch = useDispatch()
  const {pathname} = useLocation()
  const navigate = useNavigate()
  
  const logout = () => {
    dispatch(logOut())

    navigate("/")

    setUser(null)
  }

  useEffect(() => {
    
    function start() {
      gapi.client.init({
        clientId: '6900107525-atfpci9u5gs8r0phth7781dk3ot98i1b.apps.googleusercontent.com',
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);

    const token = user?.token

    if(token){
      const decodedToken = decode(token)
      if(decodedToken.exp * 1000 < new Date().getTime()) dispatch(logOut())
    }


    setUser(JSON.parse(localStorage.getItem('profile')))
  },[pathname])
    return (
        <AppBar position="static" sx={{marginBottom: '1rem'}}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component={LinkTitle} to="/" sx={{ flexGrow: 1 }}>
              Media Sosial
            </Typography>
            {user ? (
              <>
                <Avatar alt={user?.result.name} src={user?.result.imageUrl} sx={{ width: 36, height: 36, marginRight: 1 }}>
                  {user?.result.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h6">{user?.result.name}</Typography>
                <Button onClick={logout} color='inherit' >Log Out</Button>
              </>
            ) : (
              <Button component={Link} to={'/auth'} color="inherit">Sign In</Button>
            )}
          </Toolbar>
        </AppBar>
    );
  }