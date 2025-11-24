const mongoose = require('mongoose');

const TimelineItem = new mongoose.Schema({
  title: String,
  date: Date,
  details: String
}, { _id: false });

const AboutSchema = new mongoose.Schema({
  mode: { type: String, enum: ['short', 'detailed'], default: 'short' },
  content: { type: String, required: true },
  timeline: { type: [TimelineItem], default: [] },
  skills: { type: [String], default: [] }
});

module.exports = mongoose.model('About', AboutSchema);
