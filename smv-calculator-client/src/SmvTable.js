import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import axios from 'axios'; // Import Axios

const SmvTable = () => {
  const [smvData, setSmvData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Make a GET request to fetch SMV data from the backend
    axios.get('http://localhost:3000/api/smvs') // Replace with your backend URL
      .then((response) => {
        setSmvData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching SMV data:', error);
      });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="SMV Table">
        <TableHead>
          <TableRow>
            <TableCell>Style No</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>SMV</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>600-1K</TableCell>
            <TableCell>1K-2K</TableCell>
            <TableCell>2K-3K</TableCell>
            <TableCell>3K-5K</TableCell>
            <TableCell>5K-10K</TableCell>
            <TableCell>More than 10K</TableCell>
            <TableCell>Remark</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : (
            smvData.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row.styleNo}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.smvValue}</TableCell>
                <TableCell>
                  {row.image && (
                    <img src={row.image} alt={`Image for ${row.styleNo}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  )}
                </TableCell>
                <TableCell>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{ marginRight: '4px' }}>$</span>
    {((0.085 * row.smvValue) + 0.5).toFixed(2)}
  </div>
</TableCell>
<TableCell>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{ marginRight: '4px' }}>$</span>
    {((0.08 * row.smvValue) + 0.45).toFixed(2)}
  </div>
</TableCell>
<TableCell>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{ marginRight: '4px' }}>$</span>
    {((0.075 * row.smvValue) + 0.4).toFixed(2)}
  </div>
</TableCell>
<TableCell>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{ marginRight: '4px' }}>$</span>
    {((0.065 * row.smvValue) + 0.4).toFixed(2)}
  </div>
</TableCell>
<TableCell>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{ marginRight: '4px' }}>$</span>
    {((0.06 * row.smvValue) + 0.4).toFixed(2)}
  </div>
</TableCell>
<TableCell>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{ marginRight: '4px' }}>$</span>
    {((0.06 * row.smvValue) + 0.35).toFixed(2)}
  </div>
</TableCell>
                <TableCell>{row.remark}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SmvTable;
