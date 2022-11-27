/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../components/Header';
import GeographyChart from '../../components/GeographyChart';

function Geography() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Geography Chart" subtitle="Simple Geography Chart" />
      <Box height="74vh" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
        <GeographyChart />
      </Box>
    </Box>
  );
}

export default Geography;
