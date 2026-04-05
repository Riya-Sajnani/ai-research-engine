const mongoose = require('mongoose');

const precedentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  citation: { type: String },
  court: { type: String, required: true },
  year: { type: Number },
  caseType: { type: String, enum: ['contract', 'arbitration', 'recovery', 'injunction', 'specific_performance'] },
  keywords: [{ type: String }],
  summary: { type: String },
  relevantSections: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Precedent', precedentSchema);