const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  caseDocumentId: { type: mongoose.Schema.Types.ObjectId, ref: 'CaseDocument' },
  aiAnalysisId: { type: mongoose.Schema.Types.ObjectId, ref: 'AIAnalysis' },
  filename: { type: String },
  caseType: { type: String },
  summary: { type: String },
  language: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('SearchHistory', searchHistorySchema);