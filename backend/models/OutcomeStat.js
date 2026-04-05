const mongoose = require('mongoose');

const outcomeStatSchema = new mongoose.Schema({
  caseType: { type: String, required: true },
  court: { type: String, required: true },
  totalCases: { type: Number },
  plaintiffWins: { type: Number },
  defendantWins: { type: Number },
  settlements: { type: Number },
  averageDurationMonths: { type: Number },
  plaintiffWinPercentage: { type: Number },
  defendantWinPercentage: { type: Number },
  settlementPercentage: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('OutcomeStat', outcomeStatSchema);