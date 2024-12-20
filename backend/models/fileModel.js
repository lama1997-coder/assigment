const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  fileType: { type: String, required: true },
  tags: [String],
  views: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true  },
  fileUrl: { type: String },  // Add the fileUrl field to the schema

});

module.exports = mongoose.model('File', fileSchema);
