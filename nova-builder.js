const fs = require('fs/promises');
const nova = require('./lib/nova');
const { minify } = require('terser');
const packageinfo = require('./package.json');

(async function buildNova() {
  try {

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


  // import resolve from 'resolve';

  // const url = import.meta.url;


  // const testimport = {}

  // export default testimport;

  // resolve('jsdoc-to-markdown', (err, res) => {
  //   console.log(res);
  //   console.log(err);
  // })


  + "43"

"5453"