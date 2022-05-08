   
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 3000;
const mysql = require('mysql')
const sqlDB = require('./config/sqlConnect')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const config = require('config');
connectDB();

// SQL Connection
sqlDB.connect((err) => {
    if (err) {
        console.error(err.stack)
        return
    }
    console.log('Connected To DB ' + sqlDB.threadId)
})



//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(cors());

// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
// app.use(passport.session()); // persistent login sessions

app.use(express.json());
app.use(session({
     secret: 'mysql',
     resave: false,
     saveUninitialized: false,
     duration: 60 * 60 * 1000,
     activeDuration: 5 * 60 * 1000
 }));
 
// const models = require("./models");
//load passport strategies
//Sync Database


app.post('/logout', (req, res) => {
  // req.logOut();
  req.session.destroy(()=>{
    // destroy session data
    req.session = null;
    res.clearCookie("so_token");
    res.json({success: true});
  });
});

/*
app.get('*', function (req, res) {
  res.sendFile(`${__dirname}/public/index.html`, (err) => {
    if (err) {
      console.log(err);
      res.end(err.message);
    }
  });
});
*/
app.use('/api', routes);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
