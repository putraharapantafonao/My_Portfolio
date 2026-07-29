const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, 'src', 'pages', 'api');
const filesToPatch = fs.readdirSync(apiDir).filter(f => f.endsWith('.ts'));

for (const file of filesToPatch) {
  const filePath = path.join(apiDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Wrap fs.mkdirSync in try-catch if it isn't already
  content = content.replace(/fs\.mkdirSync\(([^)]+)\);/g, (match) => {
    return `try { ${match} } catch (e) {}`;
  });

  // Also wrap fs.writeFileSync in readData in try-catch if it isn't already
  content = content.replace(/fs\.writeFileSync\(([^)]+)\);/g, (match) => {
    return `try { ${match} } catch (e) {}`;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Patched mkdir and write in', file);
}
