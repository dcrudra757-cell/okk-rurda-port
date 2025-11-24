const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  tags: [String],
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('FAQ', FAQSchema);
