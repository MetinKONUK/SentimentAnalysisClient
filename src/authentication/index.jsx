/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import {
  CssBaseline,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Paper,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from './Login';
import EmployeeRegister from './Register/EmployeeRegister';
import ManagerRegister from './Register/ManagerRegister';
import registerImage from './backgroundImages/registerBackground.jpg';
import loginImage from './backgroundImages/loginBackground.jpg';

const theme = createTheme();
// send and retrieve credentials from database here
function Auth() {
  const [action, setAction] = useState(0);
  const handleActionChange = (event) => {
    setAction(event.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: action === 0 ? `url(${loginImage})` : `url(${registerImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {
            action === 0 ? <Login /> : null
          }
          {
            action === 1 ? <EmployeeRegister /> : null
          }
          {
            action === 2 ? <ManagerRegister /> : null
          }
          <Grid container>
            <InputLabel sx={{ mx: 4 }} id="demo-simple-select-label">Select Action</InputLabel>
            <Select
              sx={{ m: 4, mt: 0 }}
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={action}
              label="action"
              onChange={handleActionChange}
            >
              <MenuItem value={0}>Login</MenuItem>
              <MenuItem value={1}>Register as Employee</MenuItem>
              <MenuItem value={2}>Register as Manager</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Auth;
