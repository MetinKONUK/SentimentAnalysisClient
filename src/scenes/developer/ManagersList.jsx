/* eslint-disable react/no-unescaped-entities */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, useTheme, Button, ModalManager,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';
import { tokens } from '../../theme';
import Header from '../../components/Header';

function ManagersList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [managers, setManagers] = useState([]);
  useEffect(() => {
    (async () => {
      await Axios.get('http://localhost:3001/read-manager/all').then(async (response) => {
        const { data } = await response;
        const aux = data.map((manager) => ({
          _id: manager['_id'],
          managerName: manager.managerName,
          managerLastname: manager.managerLastname,
          managerAge: manager.managerAge,
          managerPrimaryPhoneNumber: manager.managerPrimaryPhoneNumber,
          managerPrimaryEmailAddress: manager.managerCredentials.managerPrimaryEmailAddress,
        }));
        setManagers(aux);
      });
    })();
  }, []);
  const handleDelete = (event, params) => {
    const { _id } = params.row;
    Axios.delete(`http://localhost:3001/delete-manager/${_id}`).then(() => console.log('deleted'));
  };
  const columns = [
    { field: '_id', headerName: 'ID' },
    {
      field: 'managerName',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column-cell',
    },
    {
      field: 'managerLastname',
      headerName: 'Lastname',
      flex: 1,
      cellClassName: 'name-column-cell',
    },
    {
      field: 'managerAge',
      headerName: 'Age',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'managerPrimaryPhoneNumber',
      headerName: 'Phone Number',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'managerPrimaryEmailAddress',
      headerName: 'Email Address',
      flex: 1,
    },
    {
      field: 'delete',
      headerName: 'Delete',
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
            handleDelete(event, cellValues);
          }}
        >
          <Typography color={colors.grey[100]}>
            🗑️
          </Typography>
        </Box>
      ),
    },
  ];
  return (
    <div>
      <Box ml={2.5} mr={2.5} mt={1.5}>
        <Header title="MANAGERS" subtitle="Managers are listed below..." />
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
          { managers && <DataGrid getRowId={(row) => row['_id']} columns={columns} rows={managers} /> }
        </Box>
      </Box>
    </div>
  );
}

export default ManagersList;
