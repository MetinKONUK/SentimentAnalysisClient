/* eslint-disable react/no-unescaped-entities */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, useTheme, Button,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';
import { tokens } from '../../theme';
import Header from '../../components/Header';

function ManagerRegisterRequests() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [requests, setRequests] = useState();
  useEffect(() => {
    (async () => {
      await Axios.get('http://localhost:3001/read-manager-movent').then((response) => {
        setRequests(response.data);
      });
    })();
  }, []);
  const handleApproval = (event, params) => {
    console.log(params.row);
  };
  const handleDenial = (event, params) => {
    console.log(params.row);
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
      <Box m="20px">
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

export default ManagerRegisterRequests;
