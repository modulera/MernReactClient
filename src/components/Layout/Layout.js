import React from "react";
import { Link } from 'react-router-dom';

import Header from './Header';

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

function Copyright(props) {
  return (
    <Box
      component="footer"
      {...props}>
      <Container maxWidth="sm">
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
        >
          {"Copyright © "}
          <Link to='/'>AppName</Link>
          {" " + new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
}

const Layout = (props) => {
  return (
    <ThemeProvider theme={Theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {Header()}

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

          <Copyright sx={{
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