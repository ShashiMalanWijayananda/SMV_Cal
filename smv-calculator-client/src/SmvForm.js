import React, { useState } from 'react';
import { TextField, Button, Grid, Container } from '@mui/material';

const SmvForm = ({ addSmv }) => {
  const [formData, setFormData] = useState({
    styleNo: '',
    quantity: '',
    smvValue: '',
    image: null, // Change to null
    remark: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('styleNo', formData.styleNo);
      formDataToSend.append('quantity', formData.quantity);
      formDataToSend.append('smvValue', formData.smvValue);
      formDataToSend.append('image', formData.image); // Append the file, not the file path
      formDataToSend.append('remark', formData.remark);

      const response = await fetch('http://localhost:3000/api/addSmvs', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        addSmv(data);
      } else {
        console.error('Error adding SMV');
      }
    } catch (error) {
      console.error('Error adding SMV:', error);
    }

    setFormData({
      styleNo: '',
      quantity: '',
      smvValue: '',
      image: null, // Reset to null after successful submission
      remark: ''
    });
  };
 
  

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Style No"
              name="styleNo"
              value={formData.styleNo}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="SMV"
              name="smvValue"
              value={formData.smvValue}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Remark"
              name="remark"
              value={formData.remark}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add SMV
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SmvForm;
