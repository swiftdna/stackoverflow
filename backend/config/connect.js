const { MongoClient } = require('mongodb');
const config = require('config');
const url = config.get('mongoURI');
//const url = 'mongodb://localhost:27017/stackoverflow';
// Connection URL
// const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'stackoverflow';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  COREAPP.db = client.db(dbName);
}

module.exports = main;

// main().then(console.log('Yeay!'));