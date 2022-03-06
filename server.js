const express = require('express');
const path = require('path');
const { StaticCompiler } = require('./nova.js');

const app = express();
app.use(express.static('build'));

(async () => {
  const compiler = new StaticCompiler([], '', { isBuilding: true });
  await compiler.watch();

  // console.log(compiler)
})()

app.get('*', (req, res) => {
  res.send('helo')
})

app.listen(5001);