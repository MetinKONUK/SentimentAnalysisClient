/* eslint-disable react/no-unescaped-entities */
/* eslint-disable dot-notation */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, useTheme, Button, ModalManager,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Axios from 'axios';
import { tokens } from '../../theme';
import Header from '../../components/Header';

function Reports() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [reports, setReports] = useState([]);
  useEffect(() => {
    (async () => {
      await Axios.get('http://localhost:3001/read-report/all').then(async (response) => {
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
          { reports && (
          <DataGrid
            components={{ Toolbar: GridToolbar }}
            getRowId={(row) => row['_id']}
            columns={columns}
            rows={reports}
          />
          ) }
        </Box>
      </Box>
    </div>
  );
}

export default Reports;
