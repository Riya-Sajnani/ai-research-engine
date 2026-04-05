const mongoose = require('mongoose');

const aiAnalysisSchema = new mongoose.Schema({
  caseDocumentId: { type: mongoose.Schema.Types.ObjectId, ref: 'CaseDocument', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  summary: { type: String },
  legalIssues: [{ type: String }],
  relevantLaws: [{ type: String }],
  caseType: { type: String },
  keywords: [{ type: String }],
  language: { type: String, default: 'english' }
}, { timestamps: true });

module.exports = mongoose.model('AIAnalysis', aiAnalysisSchema);