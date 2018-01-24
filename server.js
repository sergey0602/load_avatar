'use strict';

const express = require('express');
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');

app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

app.post('/file', (req, res) => {
  if (!req.files) {
    return res.sendStatus(400);
  } else {
    req.files.file.mv(`${__dirname}/images/${req.files.file.name}`);
    res.send('ok')
  }
});

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Something broke!');
});

app.listen(6289, () => console.log('Server successfully started on http://localhost:6289/'));
