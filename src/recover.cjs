const fs = require('fs');

const logPath = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\e7e870bc-3cb2-46ad-a2f3-c3610dd7cf43\\.system_generated\\logs\\transcript.jsonl';
const lines = fs.readFileSync(logPath, 'utf8').split('\n');

const recover = (lineNum, targetFile) => {
  const line = lines[lineNum];
  if (!line) {
    console.error('Line not found:', lineNum);
    return;
  }
  const obj = JSON.parse(line);
  let code = obj.tool_calls[0].args.CodeContent;
  
  // Clean string if double-serialized in JSON log
  if (code.startsWith('"')) {
    code = JSON.parse(code);
  } else if (code.includes('\\n')) {
    // If it has escaped sequences but doesn't start with quote, wrap it and parse
    code = JSON.parse('"' + code.replace(/"/g, '\\"') + '"');
  }
  
  fs.writeFileSync(targetFile, code, 'utf8');
  console.log('Successfully recovered', targetFile, 'from line', lineNum);
};

recover(408, 'src/pages/index.astro');
recover(444, 'src/pages/blog/[id].astro');
recover(345, 'src/layouts/AdminLayout.astro');
recover(347, 'src/pages/admin/index.astro');
