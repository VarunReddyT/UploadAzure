const express = require('express');
const { blobServiceClient } = require('./azure-config');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const formidable = require('formidable');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'https://uploadazure.vercel.app' }));
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const file = files.video;
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = uuidv4() + '-' + file.originalFilename;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    try {
      await blockBlobClient.uploadStream(file.stream, file.size, 5, {
        blobHTTPHeaders: { blobContentType: file.mimetype }
      });

      const videoUrl = blockBlobClient.url;
      console.log(videoUrl);
      res.status(200).json({ message: 'Video uploaded successfully', url: videoUrl });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
