const path = require('path');
const { expect } = require('chai');
const request = require('supertest');
const express = require('express');
const uploadTmp = require('../../lib/middleware/upload-tmp');

const app = express();

app.post('/upload-files', uploadTmp.array('photo'), (req, res) => {
  res.send(req.files.map((f) => f.path));
});

app.post('/upload-file', uploadTmp.single('photo'), (req, res) => {
  res.send(req.file.path);
});

it('should response 2 file paths', async () => {
  const { body: filePaths } = await request(app)
    .post('/upload-files')
    .attach('photo', path.join(__dirname, '../assets/product-1.jpg'))
    .attach('photo', path.join(__dirname, '../assets/product-2.jpg'))
    .expect(200);

  expect(filePaths.length).to.equal(2);
});

it('should response a single file path', async () => {
  const { text: filePath } = await request(app)
    .post('/upload-file')
    .attach('photo', path.join(__dirname, '../assets/product-1.jpg'))
    .expect(200);

  expect(filePath).to.be.not.null;
  expect(typeof filePath).to.equal('string');
});
