import React from "react";
import { Link } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

import Theme from '../Theme';
import { ThemeProvider } from "@mui/material/styles";

import {
  Box,
  Toolbar,
  Grid,
  Typography,
  Container,
  CssBaseline,
} from '@mui/material';

const Layout = (props) => {
  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Header />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            // height: "100vh",
            // overflow: "auto",
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {props.children}
              </Grid>
            </Grid>
          </Container>

          <Footer sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout;