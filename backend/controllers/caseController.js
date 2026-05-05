const CaseDocument = require('../models/CaseDocument');
const AIAnalysis = require('../models/AIAnalysis');
const LegalProvision = require('../models/LegalProvision');
const Precedent = require('../models/Precedent');
const OutcomeStat = require('../models/OutcomeStat');
const SearchHistory = require('../models/SearchHistory');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const { analyzeWithGemini } = require('../utils/Gemini');

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

    //Temporary debug line
console.log('Gemini keywords:', geminiResult.keywords);
console.log('Gemini caseType:', geminiResult.caseType);

    // Step 5 - Three parallel MongoDB searches
    
      const keywordRegex = geminiResult.keywords.map(k => new RegExp(k, 'i'));

      const [provisions, precedents, outcomeStat] = await Promise.all([
        LegalProvision.find({
            $or: [
              { keywords: { $in: geminiResult.keywords } },
              { keywords: { $in: keywordRegex } },
              { description: { $regex: geminiResult.keywords.join('|'), $options: 'i' } },
              { actName: { $regex: geminiResult.keywords.join('|'), $options: 'i' } },
              { keywords: { $regex: geminiResult.caseType, $options: 'i' } },
              { title: { $regex: geminiResult.caseType, $options: 'i' } }
            ]
          }).limit(5),

        Precedent.find({
          $or: [
            { keywords: { $in: geminiResult.keywords } },
            { keywords: { $in: keywordRegex } },
            { caseType: geminiResult.caseType },
            { summary: { $regex: geminiResult.keywords.join('|'), $options: 'i' } }
          ]
        }).limit(5),

        OutcomeStat.findOne({
          $or: [
            { caseType: geminiResult.caseType },
            { caseType: { $regex: geminiResult.caseType, $options: 'i' } }
          ]
        })
      ]);
      console.log('Provisions found:', provisions.length);
console.log('Precedents found:', precedents.length);
console.log('OutcomeStat found:', outcomeStat);
console.log('Keywords for search:', geminiResult.keywords);
console.log('CaseType for search:', geminiResult.caseType);
console.log('Provisions found:', provisions.length);
if(provisions.length > 0) {
  console.log('First provision:', provisions[0]);
} else {
  // Manual test search
  const testSearch = await LegalProvision.find({});
  console.log('Total provisions in DB:', testSearch.length);
  console.log('Sample provision keywords:', testSearch[0]?.keywords);
}

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
    console.error('uploadCase error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadCase };
