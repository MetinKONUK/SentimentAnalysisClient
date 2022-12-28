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

function Reports() {
  const user = useSelector((state) => state.user);
  const { userData, position } = user;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [reports, setReports] = useState([]);
  useEffect(() => {
    (async () => {
      let id = null;
      await Axios.get('http://localhost:3001/read-employee/all').then(async (response) => {
        const { data } = await response;
        // eslint-disable-next-line array-callback-return
        data.map((employee) => {
          if (employee.employeeCredentials.employeePrimaryEmailAddress === userData.email) {
            id = employee['_id'];
            console.log('found', id);
          }
        });
      });
      await Axios.get(`http://localhost:3001/read-report/${id}`).then(async (response) => {
        const { data } = await response;
        const aux = data.map((report, index) => ({
          _id: report['_id'],
          reportTitle: report.reportTitle,
          reportContent: report.reportContent,
          reportDate: report.reportDate,
          commentContent: report.reportReferringAnalyze.content,
          commentAnalyzeResult: report.reportReferringAnalyze.analyzeResult,
        }));
        setReports(aux);
      });
    })();
  }, []);
  const handleDelete = (event, params) => {
    const data = params.row;
    Axios.delete(`http://localhost:3001/delete-report/${data['_id']}`).then(() => {
      console.log('deleted');
    });
  };
  const columns = [
    { field: '_id', headerName: 'ID' },
    {
      field: 'reportTitle',
      headerName: 'Title',
      flex: 1,
      cellClassName: 'name-column-cell',
    },
    {
      field: 'reportContent',
      headerName: 'Content',
      flex: 1,
      cellClassName: 'name-column-cell',
    },
    {
      field: 'reportDate',
      headerName: 'Report Date',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'commentContent',
      headerName: 'Reported Comment',
      headerAlign: 'left',
      align: 'left',
    },
    {
      field: 'commentAnalyzeResult',
      headerName: 'Analyze Result',
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
        <Header title="REPORTS" subtitle="Reports from employees are listed below..." />
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
          { reports && <DataGrid getRowId={(row) => row['_id']} columns={columns} rows={reports} /> }
        </Box>
      </Box>
    </div>
  );
}

export default Reports;
