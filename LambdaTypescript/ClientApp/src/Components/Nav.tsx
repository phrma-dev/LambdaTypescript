import * as React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Box, Button, Container, IconButton, Link, Toolbar } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

import { BrowserRouter, Link as RouterLink, Route } from 'react-router-dom';



 const MainNavbar = () => {


  return (
   
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottomColor: 'divider',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        color: 'text.secondary'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ minHeight: 64 }}
        >
          <RouterLink to="/Dash">
            <a>
              <Box
                sx={{
                  display: {
                    md: 'inline',
                    xs: 'none'
                  },
                  height: 40,
                  width: 40
                }}
              />
            </a>
          </RouterLink>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            color="inherit"
         
            sx={{
              display: {
                md: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box
            sx={{
              alignItems: 'center',
              display: {
                md: 'flex',
                xs: 'none'
              }
            }}
          >
            <RouterLink
              to="/dashboard"
       
            >
              <Link
                color="textSecondary"
                underline="none"
                variant="subtitle2"
              >
                Live Demo
              </Link>
            </RouterLink>
            <Button
              component="a"
              href="https://material-ui.com/store/items/devias-kit-pro"
              size="medium"
              sx={{ ml: 2 }}
              target="_blank"
              variant="contained"
            >
              Buy Now
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>


  );
};


export default MainNavbar;