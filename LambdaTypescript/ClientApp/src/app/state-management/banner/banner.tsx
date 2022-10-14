import PropTypes from 'prop-types';
import { Box, Button, Card, Paper, Slide, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from '../hooks';
import { toggleBannerIsOpen } from './banner-slice';

export default function OverviewBanner() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state);
    const onDismiss = () => {
        dispatch(toggleBannerIsOpen());
    };
    return (
        <Slide
            direction="down"
            in={state.banner.isOpen}
            unmountOnExit
            timeout={{ enter: 1000, exit: 1000 }}
            easing={{ enter: theme.transitions.easing.easeOut, exit: theme.transitions.easing.easeOut }}
        >
            <Paper elevation={6}>
                <Card
                    elevation={24}
                    sx={{
                        alignItems: 'center',
                        backgroundColor: '#1f334a',
                        color: 'primary.contrastText',
                        display: 'flex',
                        flexDirection: {
                            xs: 'column',
                            md: 'row',
                        },
                        p: 4,
                    }}
                >
                    <Box
                        sx={{
                            mr: 4,
                            width: 200,
                            height: 200,
                            '& img': {
                                height: 200,
                                width: 'auto',
                            },
                        }}
                    ></Box>
                    <div>
                        <Typography color="inherit" sx={{ mt: 2 }} variant="h4">
                            Welcome to PhRMA Inside!
                        </Typography>
                        <Typography color="inherit" sx={{ mt: 1 }} variant="subtitle2">
                            Your dashboard has been improved! Explore new features like Notifications, Search, Jobs
                            Platform and more.
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Button style={{ backgroundColor: '#2b88d2' }} onClick={onDismiss} variant="contained">
                                Dismiss Banner
                            </Button>
                        </Box>
                    </div>
                </Card>
            </Paper>
        </Slide>
    );
}

OverviewBanner.propTypes = {
    onDismiss: PropTypes.func,
};
