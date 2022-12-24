/* eslint-disable prefer-regex-literals */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Grid,
  Typography,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { indigo } from '@mui/material/colors';
import {
  signInWithGoogle,
  loginWithEmailAndPassword,
  signInWithFacebook,
  signInWithGithub,
} from '../firebase';
import googleIcon from './icons/google.png';
import facebookIcon from './icons/facebook.png';
import githubIcon from './icons/github.png';
import headerIcon from './icons/header.png';

function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const [position, setPosition] = useState(null);
  const [credentials, setCredentials] = useState({});

  const checkDataValidity = (data) => {
    const { email, password } = data;
    const emailAddressValidator = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
    const passwordValidator = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$');
    if (!emailAddressValidator.test(email)) {
      enqueueSnackbar('Email address format is not valid!', { variant: 'warning' });
      return false;
    }
    if (!passwordValidator.test(password)) {
      enqueueSnackbar('Password must be at least 8 characters, contain at least one number, one uppercase and one lowercase letter!', { variant: 'warning' });
      return false;
    }
    return true;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: credentials.email,
      password: credentials.password,
    };
    if (checkDataValidity(data)) {
      if (position === 'employee') {
        //
      } else if (position === 'manager') {
        //
      } else {
        //
      }
    }
  };
  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };
  return (
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ width: 150, height: 150 }} src={headerIcon} />
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          name="email"
          id="email"
          label="Email"
          type="email"
          required
          fullWidth
          size="medium"
          margin="normal"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          name="password"
          id="password"
          label="Password"
          type="password"
          required
          fullWidth
          size="medium"
          margin="normal"
          onChange={handleChange}
        />
        <Typography component="h1" variant="h5" align="center" sx={{ mt: 1 }}>
          Select position you work on
        </Typography>
        <Grid
          sx={{ mt: 1 }}
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <RadioGroup
            defaultValue="employee"
            onChange={handlePositionChange}
          >
            <FormControlLabel
              name="developer"
              control={<Radio value="developer" />}
              label="Developer"
            />
            <FormControlLabel
              control={<Radio value="manager" />}
              name="manager"
              label="Manager"
            />
            <FormControlLabel
              name="employee"
              control={<Radio value="employee" />}
              label="Employee"
            />
          </RadioGroup>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3.5, mb: 0.5, bgcolor: indigo[700], borderRadius: 0, boxShadow: 0, '&:hover': { backgroundColor: indigo[500] },
            }}
          >
            Sign In
          </Button>
        </Grid>
        <Grid
          sx={{ mt: 1 }}
          container
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={4}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 0.5, mb: 0.5, bgcolor: 'white', borderRadius: 0, boxShadow: 0, '&:hover': { backgroundColor: 'white' },
              }}
              onClick={signInWithGithub}
              startIcon={<Avatar src={githubIcon} />}
            >
              {null}
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 0.5, mb: 0.5, bgcolor: 'white', borderRadius: 0, boxShadow: 0, '&:hover': { backgroundColor: 'white' },
              }}
              onClick={signInWithFacebook}
              startIcon={<Avatar src={facebookIcon} />}
            >
              {null}
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 0.5, mb: 0.5, bgcolor: 'white', borderRadius: 0, boxShadow: 0, '&:hover': { backgroundColor: 'white' },
              }}
              onClick={signInWithGoogle}
              startIcon={<Avatar src={googleIcon} />}
            >
              {null}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Login;
