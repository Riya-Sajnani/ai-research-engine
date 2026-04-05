const mongoose = require('mongoose');

const caseDocumentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  extractedText: { type: String },
  language: { type: String, default: 'english' },
  status: { type: String, default: 'processing' }
}, { timestamps: true });

module.exports = mongoose.model('CaseDocument', caseDocumentSchema);