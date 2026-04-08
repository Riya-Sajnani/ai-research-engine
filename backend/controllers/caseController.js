const CaseDocument = require('../models/CaseDocument');
const AIAnalysis = require('../models/AIAnalysis');
const LegalProvision = require('../models/LegalProvision');
const Precedent = require('../models/Precedent');
const OutcomeStat = require('../models/OutcomeStat');
const SearchHistory = require('../models/SearchHistory');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const { analyzeWithGemini } = require('../utils/gemini');

const uploadCase = async (req, res) => {
  try {
    // Step 1 - Check if file uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF file' });
    }

    const language = req.body.language || 'english';

    // Step 2 - Extract text from PDF
    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(pdfBuffer);
    const extractedText = pdfData.text;

    // Step 3 - Save case document to MongoDB
    const caseDocument = await CaseDocument.create({
      userId: req.user._id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      extractedText: extractedText,
      language: language,
      status: 'processing'
    });

    // Step 4 - Send to Gemini API
    const geminiResult = await analyzeWithGemini(extractedText, language);

    // Step 5 - Three parallel MongoDB searches
    const [provisions, precedents, outcomeStat] = await Promise.all([
      LegalProvision.find({
        keywords: { $in: geminiResult.keywords }
      }).limit(5),

      Precedent.find({
        keywords: { $in: geminiResult.keywords }
      }).limit(5),

      OutcomeStat.findOne({
        caseType: geminiResult.caseType
      })
    ]);

    // Step 6 - Save AI Analysis
    const aiAnalysis = await AIAnalysis.create({
      caseDocumentId: caseDocument._id,
      userId: req.user._id,
      summary: geminiResult.summary,
      legalIssues: geminiResult.legalIssues,
      relevantLaws: geminiResult.relevantLaws,
      caseType: geminiResult.caseType,
      keywords: geminiResult.keywords,
      language: language
    });

    // Step 7 - Save to Search History
    await SearchHistory.create({
      userId: req.user._id,
      caseDocumentId: caseDocument._id,
      aiAnalysisId: aiAnalysis._id,
      filename: req.file.originalname,
      caseType: geminiResult.caseType,
      summary: geminiResult.summary,
      language: language
    });

    // Step 8 - Update case document status
    await CaseDocument.findByIdAndUpdate(
      caseDocument._id,
      { status: 'completed' }
    );

    // Step 9 - Send complete result to frontend
    res.status(200).json({
      success: true,
      data: {
        summary: geminiResult.summary,
        legalIssues: geminiResult.legalIssues,
        relevantLaws: geminiResult.relevantLaws,
        caseType: geminiResult.caseType,
        provisions: provisions,
        precedents: precedents,
        outcomeStat: outcomeStat,
        disclaimer: 'Statistical guidance only. AI is a facilitator not decision maker.'
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadCase };