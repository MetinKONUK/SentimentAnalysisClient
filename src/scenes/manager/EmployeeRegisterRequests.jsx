/* eslint-disable react/no-unescaped-entities */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Box, Typography, useTheme, Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import { registerWithEmailAndPassword } from '../../firebase';

function EmployeeRegisterRequests() {
  const user = useSelector((state) => state.user);
  const { userData, position } = user;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    (async () => {
      let currentManagerId = null;
      await Axios.get(`http://localhost:3001/read-manager/${userData.email}`).then(async (response) => {
        currentManagerId = response.data[0]['_id'];
      });
      await Axios.get(`http://localhost:3001/read-employee-movent/${currentManagerId}`).then(async (response) => {
        setRequests(await response.data);
      });
    })();
  }, []);
  const handleApproval = (event, params) => {
    // insert manager data to managers collection
    const data = params.row;
    Axios.post('http://localhost:3001/insert-employee', data);
    // registerWithEmailAndPassword(data.moventEmailAddress, data.moventPassword);
    console.log('saved');
    // delete manager movent data from manager movents collection
    const { _id } = params.row;
    console.log(_id);
    Axios.delete(`http://localhost:3001/delete-employee-movent/${_id}`);
  };
  const handleDenial = (event, params) => {
    const { _id } = params.row;
    console.log(_id);
    Axios.delete(`http://localhost:3001/delete-employee-movent/${_id}`);
  };
  const columns = [
    { field: '_id', headerName: 'ID' },
    {
      field: 'moventName',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column-cell',
    },
    {
      field: 'moventLastname',
      headerName: 'Lastname',
      flex: 1,
      cellClassName: 'name-column-cell',
    },
    {
      field: 'moventAge',
      headerName: 'Age',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'moventPhoneNumber',
      headerName: 'Phone Number',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'moventEmailAddress',
      headerName: 'Email Address',
      flex: 1,
    },
    {
      field: 'letterOfRequest',
      headerName: 'Letter of Request',
      flex: 1,
    },
    {
      field: 'requestDate',
      headerName: 'Request Date',
      flex: 1,
    },
    {
      field: 'approve',
      headerName: 'Approve',
      renderCell: (cellValues) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={colors.greenAccent[700]}
          borderRadius="0px"
          sx={{ cursor: 'pointer' }}
          onClick={(event) => {
            handleApproval(event, cellValues);
          }}
        >
          <Typography color={colors.grey[100]}>
            ✅
          </Typography>
        </Box>
      ),
    },
    {
      field: 'dismiss',
      headerName: 'Dismiss',
      renderCell: (cellValues) => (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor={colors.redAccent[700]}
          borderRadius="0px"
          sx={{ cursor: 'pointer' }}
          onClick={(event) => {
            handleDenial(event, cellValues);
          }}
        >
          <Typography color={colors.grey[100]}>
            ❌
          </Typography>
        </Box>
      ),
    },
  ];
  return (
    <div>
      <Box ml={2.5} mr={2.5} mt={1.5}>
        <Header title="EMPLOYEE MOVENTS" subtitle="Employee movents who wanted work with you are listed below..." />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .name-column--cell': {
              color: colors.greenAccent[300],
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: colors.blueAccent[700],
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.primary[400],
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: colors.blueAccent[700],
            },
          }}
        >
          { requests && <DataGrid getRowId={(row) => row['_id']} columns={columns} rows={requests} /> }
        </Box>
      </Box>
    </div>
  );
}

export default EmployeeRegisterRequests;
