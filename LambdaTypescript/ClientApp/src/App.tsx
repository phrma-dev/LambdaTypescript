import React from 'react';
import Dash from './Pages/Dashboard/Dash';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import DashboardLayout from './Components/dashboard/dashboard-layout';
import { MainLayout } from './Components/main-layout';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from './theme';
import Overview from './Components/Overview';
import ContentContainer from './Components/fileExplorer/FileExplorer';

const App = () => {
    return (
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
                        <Route path="/Explorer" element={<ContentContainer />} />
                    </Routes>
                </DashboardLayout>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
