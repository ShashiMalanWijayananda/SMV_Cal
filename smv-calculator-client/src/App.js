import React, { useState, useEffect } from 'react';
import SmvTable from './SmvTable';
import SmvForm from './SmvForm';
import { Container, Typography } from '@mui/material';

const App = () => {
  const [smvData, setSmvData] = useState([]);

  // Function to add a new SMV entry
  const addSmv = (newSmv) => {
    setSmvData([...smvData, newSmv]);
  };

  useEffect(() => {
    // Fetch initial SMV data here if needed
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        SMV Calculator
      </Typography>
      <SmvForm addSmv={addSmv} />
      <SmvTable smvData={smvData} />
    </Container>
  );
};

export default App;
