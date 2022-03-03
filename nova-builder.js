const fs = require('fs/promises');
const path = require('path');
const nova = require('./lib/nova');
const { minify } = require('terser');
const packageinfo = require('./package.json');

(async function buildNova() {
  try {
    const dir = await fs.readdir(__dirname);
    const oldfile = dir.find(file => /nova\d/.test(file));
    await fs.unlink(path.join(__dirname, oldfile));

    let buildString = "const root = document.getElementById('root')";

    for (const module in nova) {
      if (/static/gi.test(module))
        continue;

      const stringifiedModule = nova[module].toString();
      buildString += '\n';
      buildString += stringifiedModule;
    }

    const minifiedBuild = await minify(buildString)
    await fs.writeFile(`nova${packageinfo.version}.min.js`, minifiedBuild.code);
  } catch (e) {
    console.error(`BUILD ERROR: ${e.message}`)
  }
})()