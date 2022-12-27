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

function DevelopersList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [developers, setDevelopers] = useState([]);
  useEffect(() => {
    (async () => {
      await Axios.get('http://localhost:3001/read-developer').then(async (response) => {
        const { data } = await response;
        const aux = data.map((developer) => ({
          _id: developer['_id'],
          developerName: developer.developerName,
          developerLastname: developer.developerLastname,
          developerPrimaryPhoneNumber: developer.developerPrimaryPhoneNumber,
          developerPrimaryEmailAddress: developer.developerCredentials.developerPrimaryEmailAddress,
        }));
        setDevelopers(aux);
      });
    })();
  }, []);
  const handleDelete = (event, params) => {
    const { _id } = params.row;
    Axios.delete(`http://localhost:3001/delete-developer/${_id}`).then(() => console.log('deleted'));
  };
  const columns = [
    { field: '_id', headerName: 'ID' },
    {
      field: 'developerName',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column-cell',
    },
    {
      field: 'developerLastname',
      headerName: 'Lastname',
      flex: 1,
      cellClassName: 'name-column-cell',
    },
    {
      field: 'developerPrimaryPhoneNumber',
      headerName: 'Phone Number',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'developerPrimaryEmailAddress',
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
        <Header title="DEVELOPERS" subtitle="Developers are listed below..." />
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
          { developers && <DataGrid getRowId={(row) => row['_id']} columns={columns} rows={developers} /> }
        </Box>
      </Box>
    </div>
  );
}

export default DevelopersList;
