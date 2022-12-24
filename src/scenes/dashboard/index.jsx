/* eslint-disable no-unused-vars */
import React from 'react';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';

function Dashboard() {
  const user = useSelector((state) => state.user);
  const position = useSelector((state) => state.position);
  console.log(user, position);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>
    </Box>
  );
}

export default Dashboard;
