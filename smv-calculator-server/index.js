const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
app.use('/uploads', express.static('uploads'));
(async () => {
  try {
    await mongoose.connect('mongodb+srv://shashimalanedu:ONaFUQ3Lm23K5eF4@cluster0.eh0lxrt.mongodb.net/',
      { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
