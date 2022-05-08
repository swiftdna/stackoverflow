const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

module.exports = async () => {
	await client.connect();
	COREAPP.rclient = client;
}
