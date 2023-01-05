import React from 'react';
import { Grid, CssBaseline, Typography, Box, Paper, Avatar, TextField, Button } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { loginRequest } from "../../authConfig";
import { store } from '../../app/state-management/store';
import { useAppDispatch, useAppSelector } from '../../app/state-management/hooks';
import { setUserEmail } from '../../app/state-management/user/user-slice';
import useApi from '../../hooks/useApi';
import { useMsal } from "@azure/msal-react";
import video from '../../../public/static/videos/atoms.mp4';
const Login = () => {

  
  const { instance, accounts } = useMsal();
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { _getUserPhoto, _getUserProfile, _getUserTeams } = useApi(state);

  var accountInterval = setInterval(() => {
    if (accounts.length > 0) {
      dispatch(setUserEmail(accounts[0].username.toLowerCase()));


      _getUserPhoto(accounts[0].username);
      _getUserTeams();
      clearInterval(accountInterval);

    } else {
      console.info("Searching for user .... ");
    }
  }, 1000);


  const handleLogin = (loginType: string) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch(e => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).then(() => {
        accountInterval;

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
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

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
export default Login;