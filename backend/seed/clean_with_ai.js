const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function cleanCase(rawText, filename) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `
You are a legal data formatter for Indian courts.
Extract structured data from this court case text.
Return ONLY valid JSON, no extra text, no markdown, no backticks.

{
  "title": "Full case name",
  "citation": "citation if found, else null",
  "court": "Supreme Court of India or High Court name",
  "year": 2020,
  "caseType": "contract or arbitration or recovery or injunction or specific_performance",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "summary": "3-4 sentence summary of facts and final decision",
  "relevantSections": ["Section X of Act Y", "Order Z of CPC"]
}

Case text:
${rawText.substring(0, 8000)}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const clean = text.replace(/```json|```/g, '').trim();
  return JSON.parse(clean);
}

async function processAll() {
  const extracted = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'extracted_texts.json'))
  );
  
  const cases = [];
  console.log(`Processing ${extracted.length} cases with Gemini...`);

  for (const item of extracted) {
    try {
      console.log(`Processing: ${item.filename}...`);
      const structured = await cleanCase(item.rawText, item.filename);
      cases.push(structured);
      console.log(`✅ Done: ${item.filename}`);
      
      // Wait 2 seconds between each call (Gemini free tier limit)
      await new Promise(resolve => setTimeout(resolve, 60000));
      
    } catch (err) {
      console.log(`❌ Failed: ${item.filename} - ${err.message}`);
    }
  }

  fs.writeFileSync(
    path.join(__dirname, 'cases.json'),
    JSON.stringify(cases, null, 2)
  );

  console.log(`\nDone! ${cases.length} cases saved.`);
  console.log('Saved to seed/cases.json ✅');
}

processAll();