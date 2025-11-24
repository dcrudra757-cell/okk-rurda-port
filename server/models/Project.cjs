const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  image: String,
  description: String,
  tech: [String],
  link: String,
  mode: { type: String, enum: ['video', 'dev'] },
  featured: { type: Boolean, default: false }
});

module.exports = mongoose.model('Project', ProjectSchema);
