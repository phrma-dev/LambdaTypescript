import React from 'react';
import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Divider,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import * as MuiIcon from '@mui/icons-material';
import { store } from '../../app/state-management/store';
import { useAppDispatch, useAppSelector } from '../../app/state-management/hooks';


const Dash = () => {
    const [displayBanner, setDisplayBanner] = useState<boolean>(true);
    const state = useAppSelector((state: any) => state);
    const dispatch = useAppDispatch();
    useEffect(() => {
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

    return (
        <>
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
                  <Typography variant="h4">{state.user.userEmail.toString()}</Typography>
                  <Typography variant="h4">{JSON.stringify(state.user.profile, null, "\t")}</Typography>
                  <Typography variant="h4">{JSON.stringify(state.user.teams, null, "\t")}</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
};
export default Dash;
