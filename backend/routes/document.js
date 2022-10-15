let express = require('express');
const models = require('../models');
let multer = require('multer');
const fs = require('fs');
let router = express.Router();

const HTMLtoDOCX = require('html-to-docx');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './files');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${+new Date()}.jpg`);
  },
});
const upload = multer({
  storage,
});
router.get('/', async (req, res, next) => {
  const documents = await models.Document.findAll();
  res.json(documents);
});
router.post('/', async (req, res, next) => {
  const document = await models.Document.create(req.body);
  res.json(document);
});
router.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  const {name, document} = req.body;
  const doc = await models.Document.update({name, document}, {where: {id}});
  res.json(doc);
});
router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  await models.Document.destroy({where: {id}});
  res.json({});
});
router.get('/generate/:id', async (req, res, next) => {
  const id = req.params.id;
  const documents = await models.Document.findAll({where: {id}});
  const document = documents[0];
  console.log(`${document.name} document = ${JSON.stringify(document)}`);

  const converted = await HTMLtoDOCX(document.document, null, {
    table: {row: {cantSplit: true}},
    footer: true,
    pageNumber: true,
  });
  console.log(`converted.byteLength = ${converted.byteLength}`);

  const fileName = `${+new Date()}.docx`;
  const documentPath = `${__dirname}/../files/${fileName}`;
  await new Promise((resolve, reject) => {
    fs.writeFile(documentPath, converted, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
  const doc = await models.Document.update(
    {documentPath: fileName},
    {where: {id}}
  );
  res.json(doc);
});
router.post('/uploadImage', upload.single('upload'), async (req, res, next) => {
  res.json({
    uploaded: true,
    url: `${process.env.BASE_URL}/${req.file.filename}`,
  });
});
module.exports = router;
