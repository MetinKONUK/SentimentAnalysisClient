/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import { Box } from '@mui/material';
import Header from '../../components/Header';
import LineChart from '../../components/LineChart';

function Line() {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="74vh">
        <LineChart />
      </Box>
    </Box>
  );
}

export default Line;
