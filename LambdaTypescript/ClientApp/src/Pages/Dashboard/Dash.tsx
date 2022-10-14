import React from 'react';
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
  Typography
} from '@mui/material';


import * as MuiIcon from '@mui/icons-material';


const Dash = () => {

    return (

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                   You've routed to Dash
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    );
  
}

export default Dash;