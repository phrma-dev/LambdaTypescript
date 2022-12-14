import React from 'react';
import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import * as MuiIcon from '@mui/icons-material';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { useAppDispatch, useAppSelector } from '../app/state-management/hooks';


const Overview = () => {
  const state = useAppSelector((state: any) => state);
  const { instance, accounts } = useMsal();
  const handleLogin = (loginType: string) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).then((data: any) => {

      }).catch(e => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).then((data: any) => {
   
      }).catch(e => {
        console.log(e);
      });
    }
  }
    const [displayBanner, setDisplayBanner] = useState<boolean>(true);

  useEffect(() => {
    if (state.user.userEmail == "") {
      handleLogin("redirect");
    }
        // Restore the persistent state from local/session storage
        const value = globalThis.sessionStorage.getItem('dismiss-banner');

        if (value === 'true') {
            // setDisplayBanner(false);
        }
    }, []);

    const handleDismissBanner = () => {
        // Update the persistent state
        // globalThis.sessionStorage.setItem('dismiss-banner', 'true');
        setDisplayBanner(false);
    };

  return (<>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{ mb: 4 }}>
                        <Grid container justifyContent="space-between" spacing={3}>
                            <Grid item>
                                <Typography variant="h4">Good Morning</Typography>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    m: -1,
                                }}
                            >
                                <Button
                                    startIcon={<MuiIcon.Report fontSize="small" />}
                                    sx={{ m: 1 }}
                                    variant="outlined"
                                >
                                    Reports
                                </Button>
                                <TextField defaultValue="week" label="Period" select size="small" sx={{ m: 1 }}>
                                    <MenuItem value="week">Last week</MenuItem>
                                    <MenuItem value="month">Last month</MenuItem>
                                    <MenuItem value="year">Last year</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                    </Box>
                    <Grid container spacing={4}>
                        <Grid item md={6} xs={12}>
                            <Card>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <MuiIcon.DriveEta color="primary" fontSize="small" />
                                        <Typography color="primary.main" sx={{ pl: 1 }} variant="subtitle2">
                                            Jobs
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" sx={{ mt: 2 }}>
                                        Find your dream job
                                    </Typography>
                                    <Typography color="textSecondary" variant="body2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua.
                                    </Typography>
                                </CardContent>
                                <Divider />
                                <CardActions>
                                    <Button endIcon={<MuiIcon.ArrowRight fontSize="small" />} size="small">
                                        Search Jobs
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <Card>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <MuiIcon.Download color="primary" />
                                        <Typography color="primary.main" sx={{ pl: 1 }} variant="subtitle2">
                                            Download
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ mt: 2 }} variant="h6">
                                        Download our Free PDF and learn how to get more job leads
                                    </Typography>
                                    <Typography color="textSecondary" variant="body2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua.
                                    </Typography>
                                </CardContent>
                                <Divider />
                                <CardActions>
                                    <Button
                                        endIcon={<MuiIcon.Download fontSize="small" />}
                                        size="small"
                                        variant="outlined"
                                    >
                                        Download Free PDF
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Card>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex',
                                        }}
                                    >
                                        <MuiIcon.SupervisedUserCircle color="primary" />
                                        <Typography color="primary.main" sx={{ pl: 1 }} variant="subtitle2">
                                            Contacts
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ mt: 2 }} variant="h6">
                                        Contacts allow you to manage your company contracts
                                    </Typography>
                                    <Typography color="textSecondary" variant="body2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna aliqua.
                                    </Typography>
                                </CardContent>
                                <Divider />
                                <CardActions>
                                    <Button
                                        endIcon={<MuiIcon.ArrowBack fontSize="small" />}
                                        size="small"
                                        variant="outlined"
                                    >
                                        My Contacts
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        
        </>
    );
};
export default Overview;
