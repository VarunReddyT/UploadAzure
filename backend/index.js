const express = require('express');
const upload = require('./upload.js');
const { blobServiceClient } = require('./azure-config.js');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors({ origin: 'https://uploadazure.vercel.app/' }));
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.post('/upload', upload.single('video'), async (req, res) => {
  try {
    console.log("First");
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = uuidv4() + '-' + req.file.originalname;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(req.file.buffer, {
      blobHTTPHeaders: { blobContentType: req.file.mimetype }
    });

    const videoUrl = blockBlobClient.url;
    console.log(videoUrl);
    res.status(200).json({ message: 'Video uploaded successfully', url: videoUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
