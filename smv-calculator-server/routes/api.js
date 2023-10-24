const express = require('express');
const router = express.Router();
const Smv = require('../models/Smv');
const multer = require('multer');

// Get all SMV entries
router.get('/smvs', async (req, res) => {
  console.log('Received GET request for SMVs'); // Add this line
  try {
    const smvs = await Smv.find();
    console.log('Fetched SMVs:', smvs); // Add this line
    res.json(smvs);
  } catch (error) {
    console.error('Error fetching SMVs:', error); // Add this line
    res.status(500).json({ message: error.message });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  },
});


const upload = multer({ storage: storage });

router.post('/addSmvs', upload.single('image'), async (req, res) => {
  console.log('Received POST request for adding SMV');

  try {
    const smv = new Smv({
      styleNo: req.body.styleNo,
      quantity: req.body.quantity,
      smvValue: req.body.smvValue,
      image: `http://localhost:3000/uploads/${req.file.filename}`, // Construct an absolute URL
      remark: req.body.remark
    });

    const newSmv = await smv.save();
    console.log('Added new SMV:', newSmv);
    res.status(201).json(newSmv);
  } catch (error) {
    console.error('Error adding new SMV:', error);
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
