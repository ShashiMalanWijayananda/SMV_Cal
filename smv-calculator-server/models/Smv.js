const mongoose = require('mongoose');

const smvSchema = new mongoose.Schema({
  styleNo: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  smvValue: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  remark: String
});

module.exports = mongoose.model('Smv', smvSchema);
