const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeWithGemini = async (extractedText, language = 'english') => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `
You are a legal research assistant for Indian commercial courts.
Analyze the following case text and respond in ${language} language.
Return ONLY valid JSON, no extra text, no markdown, no backticks.

{
  "summary": "3-4 sentence summary of the case facts and main legal issue",
  "legalIssues": ["issue1", "issue2", "issue3"],
  "relevantLaws": ["law1", "law2", "law3"],
  "caseType": "contract or arbitration or recovery or injunction or specific_performance",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}

Case text:
${extractedText.substring(0, 8000)}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
};

module.exports = { analyzeWithGemini };