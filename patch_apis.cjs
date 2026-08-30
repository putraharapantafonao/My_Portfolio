const fs = require('fs');
const path = require('path');

const apiDir = path.join(__dirname, 'src', 'pages', 'api');
const filesToPatch = ['profile.ts', 'projects.ts', 'publications.ts', 'certificates.ts', 'education.ts', 'skills.ts', 'blogs.ts'];

for (const file of filesToPatch) {
  const filePath = path.join(apiDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Add the import if not exists
  if (!content.includes('uploadToGithub')) {
    content = content.replace("import path from 'node:path';", "import path from 'node:path';\nimport { uploadToGithub } from '../../utils/github';");
  }

  // Profile has direct writeFileSync
  if (file === 'profile.ts') {
    content = content.replace(
      /fs\.writeFileSync\(filePath, JSON\.stringify\(merged, null, 2\), 'utf-8'\);/g,
      `try { fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf-8'); } catch (e) {}\n    await uploadToGithub('src/data/profile.json', JSON.stringify(merged, null, 2), 'Update profile');`
    );
  } else {
    // Others use writeData function
    // We need to make writeData async if it's not
    content = content.replace(/function writeData\(data: any\) \{/, 'async function writeData(data: any) {');
    
    // Replace writeFileSync inside writeData
    content = content.replace(
      /fs\.writeFileSync\(filePath, JSON\.stringify\(data, null, 2\), 'utf-8'\);/g,
      `try { fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8'); } catch (e) {}\n  await uploadToGithub('src/data/${file.replace('.ts', '.json')}', JSON.stringify(data, null, 2), 'Update ${file.replace('.ts', '.json')}');`
    );
    
    // Now we must await writeData in POST, PUT, DELETE
    content = content.replace(/writeData\(data\);/g, 'await writeData(data);');
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Patched', file);
}
