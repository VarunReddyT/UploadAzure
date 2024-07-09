const { BlobServiceClient } = require('@azure/storage-blob');

// const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const blobServiceClient = BlobServiceClient.fromConnectionString("DefaultEndpointsProtocol=https;AccountName=tfdvideostry;AccountKey=orB6L7JgevGPglh3XFLXyflTJlnhXj6ZI/+jfeKGMCZZiWiQE1L92/bcCSnkCyMuDO92sqJ+SKUJ+ASt1jVJUw==;EndpointSuffix=core.windows.net");

module.exports = { blobServiceClient };
