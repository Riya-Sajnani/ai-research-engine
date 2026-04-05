const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const pdfFolder = path.join(__dirname, 'pdfs');

async function extractAll() {
  const files = fs.readdirSync(pdfFolder).filter(f => f.endsWith('.PDF'));
  
  if(files.length === 0){
    console.log('No PDFs found in pdfs/ folder!');
    return;
  }

  console.log(`Found ${files.length} PDFs. Starting extraction...`);
  const results = [];

  for (const file of files) {
    try {
      const buffer = fs.readFileSync(path.join(pdfFolder, file));
      const data = await pdfParse(buffer);
      results.push({
        filename: file,
        rawText: data.text
      });
      console.log(`✅ Extracted: ${file}`);
    } catch (err) {
      console.log(`❌ Failed: ${file} - ${err.message}`);
    }
  }

  fs.writeFileSync(
    path.join(__dirname, 'extracted_texts.json'),
    JSON.stringify(results, null, 2)
  );
  
  console.log(`\nDone! ${results.length} files extracted.`);
  console.log('Saved to seed/extracted_texts.json');
}

extractAll();