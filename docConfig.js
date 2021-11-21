const jsdoc2md = require('jsdoc-to-markdown'); 
const fs = require('fs').promises;

async function generateDocs() {
  const api = await jsdoc2md.render({ files: 'lib/*.js' });
  let file = await fs.readFile('./template.md');
  file = String(file).replace('{{{API}}}', api);
  fs.writeFile('./README.md', file);

}

generateDocs();