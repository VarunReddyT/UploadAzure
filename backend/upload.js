const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();

const upload = multer({ 
    storage: inMemoryStorage,
    limits: { fileSize: 100 * 1024 * 1024 } 
  });

module.exports = upload;
