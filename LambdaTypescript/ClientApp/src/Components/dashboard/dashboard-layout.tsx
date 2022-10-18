import React, { FC, ReactNode, useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Button, Container, IconButton, Link, Toolbar } from '@mui/material';
import { Menu as MenuIcon, Face as FaceIcon } from '@mui/icons-material';
import { BrowserRouter, Link as RouterLink, Route } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import Overview from '../Overview';

interface DashboardLayoutProps {
    children?: ReactNode;
}

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 280,
    },
}));
const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
    const { children } = props;
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    return (
        <>
            <DashboardLayoutRoot>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        width: '100%',
                    }}
                >
                    {children}
                </Box>
            </DashboardLayoutRoot>
            <DashboardNavbar onOpenSidebar={(): void => setIsSidebarOpen(true)} />
            <DashboardSidebar onClose={(): void => setIsSidebarOpen(false)} open={isSidebarOpen} />
        </>
    );
};
DashboardLayout.propTypes = {
    children: PropTypes.node,
};

export default DashboardLayout;
