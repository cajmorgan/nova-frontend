const express = require('express');
const path = require('path');
const { StaticCompiler } = require('./index');

const app = express();
app.use(express.static('build'));

(async () => {
  const compiler = new StaticCompiler([], {}, '', true);
  await compiler.fullBuild();

  // console.log(compiler)
})()

app.get('*', (req, res) => {
  res.send('helo')
})

app.listen(5001);