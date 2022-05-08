const mysql = require('mysql')
const db = mysql.createConnection({
    host: 'stackoverflow.clmncxwxxtec.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'shiva123',
    database: 'stackOverflow',
})
module.exports = db