/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-unused-vars */
import { Box } from '@mui/material';
import Header from '../../components/Header';
import PieChart from '../../components/PieChart';

function Pie() {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="74vh">
        <PieChart />
      </Box>
    </Box>
  );
}

export default Pie;
