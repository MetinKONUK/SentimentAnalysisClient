/* eslint-disable prefer-regex-literals */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { indigo } from '@mui/material/colors';
import Axios from 'axios';
import headerIcon from '../icons/headerr.png';

function ManagerRegister() {
  const { enqueueSnackbar } = useSnackbar();
  const [moventData, setMoventData] = useState({});
  const handleChange = (event) => {
    setMoventData({ ...moventData, [event.target.name]: event.target.value });
  };
  const checkDataValidity = async (data) => {
    const {
      moventName,
      moventLastname,
      moventAge,
      moventPhoneNumber,
      moventEmailAddress,
      letterOfRequest,
      moventPassword,
    } = data;
    const phoneNumberValidator = new RegExp('^5[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]');
    const emailAddressValidator = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
    const passwordValidator = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$');
    if (moventName === undefined || moventName.length === 0) {
      enqueueSnackbar('Name field must be filled!', { variant: 'warning' });
      return false;
    }
    if (moventLastname === undefined || moventLastname.length === 0) {
      enqueueSnackbar('Lastname field must be filled!', { variant: 'warning' });
      return false;
    }
    if (moventAge === undefined) {
      enqueueSnackbar('Please insert your age!', { variant: 'warning' });
      return false;
    }
    if (moventAge < 18) {
      enqueueSnackbar('You must be older than 18 to apply!', { variant: 'warning' });
      return false;
    }
    // eslint-disable-next-line max-len
    if (moventPhoneNumber === undefined || !phoneNumberValidator.test(moventPhoneNumber.toString())) {
      enqueueSnackbar('Phone number format is not valid!', { variant: 'warning' });
      return false;
    }
    if (letterOfRequest === undefined || letterOfRequest.length < 10) {
      enqueueSnackbar('Letter of request must be at least 10 characters!', { variant: 'warning' });
      return false;
    }
    if (!emailAddressValidator.test(moventEmailAddress)) {
      enqueueSnackbar('Email address format is not valid!', { variant: 'warning' });
      return false;
    }
    let exists = false;
    await Axios.get('http://localhost:3001/read-manager-movent').then((response) => {
      for (let i = 0; i < response.data.length; i += 1) {
        if (response.data[i].moventEmailAddress === moventEmailAddress) {
          exists = true;
          break;
        }
      }
    });
    await Axios.get('http://localhost:3001/read-employee-movent').then((response) => {
      for (let i = 0; i < response.data.length; i += 1) {
        if (response.data[i].moventEmailAddress === moventEmailAddress) {
          exists = true;
          break;
        }
      }
    });
    if (exists) {
      enqueueSnackbar('Email address in already in use!', { variant: 'warning' });
      return false;
    }
    if (!passwordValidator.test(moventPassword)) {
      enqueueSnackbar('Password must be at least 8 characters, contain at least one number, one uppercase and one lowercase letter!', { variant: 'warning' });
      return false;
    }
    // check account absence here
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      moventName: moventData['manager-firstname'],
      moventLastname: moventData['manager-lastname'],
      moventAge: moventData['manager-age'],
      moventPhoneNumber: moventData['manager-phone-number'],
      moventEmailAddress: moventData['manager-email-address'],
      letterOfRequest: moventData['manager-letter-of-request'],
      moventPassword: moventData['manager-password'],
    };
    if (await checkDataValidity(data)) {
      Axios.post('http://localhost:3001/insert-manager-movent', data)
        .then((response) => {
          const { status } = response.data;
          if (status) {
            enqueueSnackbar('Apply succeed!', { variant: 'success' });
          } else {
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
      <Avatar
        sx={{
          mb: 0.5, bgcolor: 'white', width: 150, height: 150,
        }}
        src={headerIcon}
      />
      <Typography component="h1" variant="h5">
        Register as Manager
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          name="manager-firstname"
          id="manager-firstname"
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
          name="manager-lastname"
          id="manager-lastname"
          label="Lastname"
          type="text"
          required
          fullWidth
          size="small"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="manager-age"
          id="manager-age"
          label="Age"
          type="number"
          required
          fullWidth
          size="small"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="manager-phone-number"
          id="manager-phone-number"
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
          name="manager-letter-of-request"
          id="manager-letter-of-request"
          label="Letter of Request"
          type="text"
          required
          fullWidth
          size="large"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="manager-email-address"
          id="manager-email-address"
          label="Email"
          type="email"
          required
          fullWidth
          size="small"
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="manager-password"
          id="manager-password"
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

export default ManagerRegister;
