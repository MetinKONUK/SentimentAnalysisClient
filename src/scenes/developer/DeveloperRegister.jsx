/* eslint-disable prefer-regex-literals */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { indigo } from '@mui/material/colors';
import Axios from 'axios';
import { registerWithEmailAndPassword } from '../../firebase';

function DeveloperRegister() {
  const { enqueueSnackbar } = useSnackbar();
  const [developerData, setDeveloperData] = useState({});
  const handleChange = (event) => {
    setDeveloperData({ ...developerData, [event.target.name]: event.target.value });
  };
  const checkDataValidity = async (data) => {
    const {
      developerName,
      developerLastname,
      developerPhoneNumber,
      developerEmailAddress,
      developerPassword,
    } = data;
    const phoneNumberValidator = new RegExp('^5[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]');
    const emailAddressValidator = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
    const passwordValidator = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$');
    if (developerName === undefined || developerName.length === 0) {
      enqueueSnackbar('Name field must be filled!', { variant: 'warning' });
      return false;
    }
    if (developerLastname === undefined || developerLastname.length === 0) {
      enqueueSnackbar('Lastname field must be filled!', { variant: 'warning' });
      return false;
    }
    // eslint-disable-next-line max-len
    if (developerPhoneNumber === undefined || !phoneNumberValidator.test(developerPhoneNumber.toString())) {
      enqueueSnackbar('Phone number format is not valid!', { variant: 'warning' });
      return false;
    }
    if (!emailAddressValidator.test(developerEmailAddress)) {
      enqueueSnackbar('Email address format is not valid!', { variant: 'warning' });
      return false;
    }
    let exists = false;
    await Axios.get('http://localhost:3001/read-employee/all').then((response) => {
      for (let i = 0; i < response.data.length; i += 1) {
        // eslint-disable-next-line max-len
        if (response.data[i].employeeCredentials.employeePrimaryEmailAddress === developerEmailAddress) {
          exists = true;
          break;
        }
      }
    });
    await Axios.get('http://localhost:3001/read-manager/all').then((response) => {
      for (let i = 0; i < response.data.length; i += 1) {
        // eslint-disable-next-line max-len
        if (response.data[i].managerCredentials.managerPrimaryEmailAddress === developerEmailAddress) {
          exists = true;
          break;
        }
      }
    });
    await Axios.get('http://localhost:3001/read-developer').then((response) => {
      for (let i = 0; i < response.data.length; i += 1) {
        // eslint-disable-next-line max-len
        if (response.data[i].developerCredentials.developerPrimaryEmailAddress === developerEmailAddress) {
          exists = true;
          break;
        }
      }
    });
    if (exists) {
      enqueueSnackbar('Email address in already in use!', { variant: 'warning' });
      return false;
    }
    if (!passwordValidator.test(developerPassword)) {
      enqueueSnackbar('Password must be at least 8 characters, contain at least one number, one uppercase and one lowercase letter!', { variant: 'warning' });
      return false;
    }
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      developerName: developerData['developer-firstname'],
      developerLastname: developerData['developer-lastname'],
      developerPhoneNumber: developerData['developer-phone-number'],
      developerEmailAddress: developerData['developer-email-address'],
      developerPassword: developerData['developer-password'],
    };
    if (await checkDataValidity(data)) {
      Axios.post('http://localhost:3001/insert-developer', data)
        .then((response) => {
          const { status } = response.data;
          console.log(response.data);
          if (status) {
          // insertion succeed
            enqueueSnackbar('Apply succeed!', { variant: 'success' });
            registerWithEmailAndPassword(data.developerEmailAddress, data.developerEmailAddress);
          } else {
          // insertion failed
            enqueueSnackbar('Apply failed!', { variant: 'error' });
          }
        })
        .catch((error) => {
          console.error(error);
          enqueueSnackbar('Apply failed!', { variant: 'error' });
        });
    }
  };
  return (
    <Box
      sx={{
        mt: 2,
        mb: 4,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Register Developer
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          name="developer-firstname"
          id="developer-firstname"
          label="Firstname"
          type="text"
          required
          fullWidth
          size="small"
          margin="normal"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          name="developer-lastname"
          id="developer-lastname"
          label="Lastname"
          type="text"
          required
          fullWidth
          size="small"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="developer-phone-number"
          id="developer-phone-number"
          label="Phone Number"
          type="number"
          helperText="5xxxxxxxxx"
          required
          fullWidth
          size="small"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="developer-email-address"
          id="developer-email-address"
          label="Email"
          type="email"
          required
          fullWidth
          size="small"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="developer-password"
          id="developer-password"
          label="Password"
          type="password"
          required
          fullWidth
          size="small"
          margin="normal"
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 0.5, bgcolor: indigo[900] }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}

export default DeveloperRegister;
