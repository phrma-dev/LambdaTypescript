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
import ITToolkit from './Pages/Intranet-Toolkits/ITToolkit/ITToolkit';
import axios from 'axios';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { store } from './app/state-management/store';
import { useAppDispatch, useAppSelector } from './app/state-management/hooks';
import { setUserEmail } from './app/state-management/user/user-slice';
import GraphAPI from './api/GraphAPI';
import { Grid, CssBaseline, Typography, Box, Paper, Avatar, TextField, Button } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import Video from './atoms.mp4';
import ReactPlayer from 'react-player';
import './react-player.css';


const Login = () => {
  const { instance, accounts } = useMsal();
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();


  const handleLogin = (loginType: string) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).then((data: any) => {
        dispatch(setUserEmail(accounts[0].username.toLowerCase()));
        console.info(data);
        
      }).catch(e => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).then((data: any) => {
        dispatch(setUserEmail(accounts[0].username.toLowerCase()));
      }).catch(e => {
        console.log(e);
      });
    }
  }
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          background: "linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 15%, rgba(0, 212, 255, 1) 100%)"

        }}
      >
        <div className='player-wrapper2' style={{ height: '100% !important', width: '100% !important' }} >
          <ReactPlayer className="react-player2" url='/static/videos/atoms.mp4'
            style={{height: '100%', width: '100%'}}
              autoPlay playsinline loop playing muted />
        </div>
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
            Sign in 2
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
            Sign In 2
          </Button>


        </Box>
      </Grid>
    </Grid>
  );
};

const App = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { _getUserProfile } = GraphAPI();
  const handleLogin = (loginType: string) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).then((data: any) => {
        dispatch(setUserEmail(accounts[0].username.toLowerCase()));
        console.info(data);

      }).catch(e => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).then((data: any) => {
        dispatch(setUserEmail(accounts[0].username.toLowerCase()));
      }).catch(e => {
        console.log(e);
      });
    }
  }
  React.useEffect(() => {
    var id = intervalTrigger();
    var count = 0;
    function intervalTrigger() {
      return window.setInterval(function () {
        if (state.user.userEmail == "" && accounts.length > 0) {
          console.info(accounts);
          dispatch(setUserEmail(accounts[0].username.toLowerCase()));
          _getUserProfile(accounts[0].username.toLowerCase());
          window.clearInterval(id);
        }
   
        
        if (state.user.userEmail != "") {
          console.info("INTERVAL CLEARED");
          window.clearInterval(id);
        }
      }, 1000);
    };

  }, []);

 
  


  return (
  <>
      <AuthenticatedTemplate>
        <BrowserRouter>

          <ThemeProvider
            theme={createTheme({
              mode: state.user.userPreferences.themeMode,
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
         <BrowserRouter>

           
                    <Routes>
                      <Route path="/" element={<Login />} />
                     </Routes>
            
      
                </BrowserRouter>
      </UnauthenticatedTemplate>
     
   

    </>

    );
};

export default App;
