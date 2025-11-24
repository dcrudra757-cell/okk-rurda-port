const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  summary: String,
  details: String,
  tags: [String],
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Service', ServiceSchema);
