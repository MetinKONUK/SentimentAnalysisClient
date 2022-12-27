/* eslint-disable react/no-unescaped-entities */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Box, Typography, useTheme, Button, ModalManager,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Axios from 'axios';
import { tokens } from '../../theme';
import Header from '../../components/Header';

function EmployeesList() {
  const user = useSelector((state) => state.user);
  const { userData, position } = user;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    (async () => {
      let ids = null;
      await Axios.get(`http://localhost:3001/read-manager/${userData.email}`).then(async (response) => {
        ids = response.data[0].managerEmployees;
      });
      console.log(ids);
      const aux = [];
      for (let i = 0; i < ids.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await Axios.get(`http://localhost:3001/read-employee/${ids[i]}`).then((response) => {
          if (response.data[0] !== undefined) {
            console.log(response.data[0]);
            aux.push(response.data[0]);
          }
        });
      }
      console.log(aux);
      setEmployees(aux);
    })();
  }, []);
  const handleDelete = (event, params) => {
    const { _id } = params.row;
    Axios.delete(`http://localhost:3001/delete-employee/${_id}`).then(() => console.log('deleted'));
  };
  const columns = [
    { field: '_id', headerName: 'ID' },
    {
      field: 'employeeName',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column-cell',
    },
    {
      field: 'employeeLastname',
      headerName: 'Lastname',
      flex: 1,
      cellClassName: 'name-column-cell',
    },
    {
      field: 'employeeAge',
      headerName: 'Age',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'employeePrimaryPhoneNumber',
      headerName: 'Phone Number',
      type: 'number',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'employeePrimaryEmailAddress',
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
        <Header title="EMPLOYEES" subtitle="Employees who you are responsible for are listed below..." />
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
          { employees && <DataGrid getRowId={(row) => row['_id']} columns={columns} rows={employees} /> }
        </Box>
      </Box>
    </div>
  );
}

export default EmployeesList;
