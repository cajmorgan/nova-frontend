const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('build'));

app.get('*', (req, res) => {
  res.send('helo')
})

app.listen(5001);