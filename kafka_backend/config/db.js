const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
// const db = 'mongodb://localhost:27017/stackoverflow';
//const db=require('./default');

const connectDB = async () => {
	try {
		await mongoose.connect(db, {
            useNewUrlParser: true,
		    useUnifiedTopology: true,
		    maxPoolSize: 500,
    //bufferMaxEntries: 0
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
