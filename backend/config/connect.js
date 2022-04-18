const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'ninja-couch';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  COREAPP.db = client.db(dbName);
}

module.exports = main;

// main().then(console.log('Yeay!'));