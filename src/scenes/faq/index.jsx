/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { tokens } from '../../theme';
import Header from '../../components/Header';

// mockdata
const faqs = [
  {
    subject: 'An important question',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    subject: 'A question about profile form',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    subject: 'How to display various data using bar chart?',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

const displayFaq = (data, colors) => (
  data.map((faq) => (
    <Accordion key={faq.subject} defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color={colors.greenAccent[500]} variant="h5">
          {faq.subject}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {faq.content}
        </Typography>
      </AccordionDetails>
    </Accordion>
  )));

function FAQ() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="frequently asked questions page" />
      { displayFaq(faqs, colors) }
    </Box>
  );
}

export default FAQ;
