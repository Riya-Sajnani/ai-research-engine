const mongoose = require('mongoose');

const legalProvisionSchema = new mongoose.Schema({
  actName: { type: String, required: true },
  section: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  keywords: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('LegalProvision', legalProvisionSchema);