/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import Dash from './Pages/Dashboard/Dash';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import DashboardLayout from './Components/dashboard/dashboard-layout';
import { MainLayout } from './Components/main-layout';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from './theme';
import Overview from './Components/Overview';
import FileExplorer from './Pages/fileExplorer/FileExplorer';
import ITToolkit from './Pages/ITToolkit/ITToolkit';
import axios from 'axios';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { store } from './app/state-management/store';
import { useAppDispatch, useAppSelector } from './app/state-management/hooks';
import { setUserEmail } from './app/state-management/user/user-slice';
import useApi from './hooks/useApi';
import { Grid, CssBaseline, Typography, Box, Paper, Avatar, TextField, Button } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';

import ReactPlayer from 'react-player';

const App = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { _getUserPhoto, _getUserProfile, _getUserTeams } = useApi(state);
  React.useEffect(() => {
    var id = intervalTrigger();
    var count = 0;
    function intervalTrigger() {
      return window.setInterval(function () {
        if (state.user.userEmail == "" && accounts.length > 0) {
          console.info(accounts);
          dispatch(setUserEmail(accounts[0].username.toLowerCase()));
          _getUserPhoto(accounts[0].username);
          window.clearInterval(id);
        } else {
          console.info("Searching for user .... ");
          console.log(accounts.length);
          count++;
          if (count > 2) {
            window.location.href = window.location.origin;
          }
        }
        if (state.user.userEmail != "") {
          console.info("INTERVAL CLEARED");
          window.clearInterval(id);
        }
      }, 500);
    };

  }, []);

 
  
  const handleLogin = (loginType: string) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch(e => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).then(() => {
        
      }).catch(e => {
        console.log(e);
      });
    }
  }
  const Login = () => {
    
    return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <video src="https://phrmadataapi.azurewebsites.net/assets/phrmawharf.mp4" autoPlay={true} loop muted style={{ width: '59vw', height: '99vh' }} />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                handleLogin("redirect");
              }}
            >
              Sign In
            </Button>



          </Box>
        </Grid>
      </Grid>
    );
  };

  return (
  <>
    <AuthenticatedTemplate>
        <BrowserRouter>
            <ThemeProvider
                theme={createTheme({
                    mode: 'light',
                })}
            >
                <CssBaseline />

                <DashboardLayout>
                    <Routes>
                        <Route path="/Dash" element={<Dash />} />
                        <Route path="/" element={<Overview />} />
                        <Route path="/Explorer" element={<FileExplorer />} />
                        <Route path="/ITToolkit" element={<ITToolkit />} />
                    </Routes>
                </DashboardLayout>
            </ThemeProvider>
        </BrowserRouter>
    </AuthenticatedTemplate>
    <UnauthenticatedTemplate>
      <Login />


    </UnauthenticatedTemplate>
    </>

    );
};

export default App;
