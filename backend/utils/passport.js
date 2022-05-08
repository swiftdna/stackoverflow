"use strict";
const JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt  = require('passport-jwt').ExtractJwt;
const passport = require('passport');
var {secret} = require('./config');
var mysql = require('mysql');
const User = require('../models/user');

const connectDB = require('../config/db');
connectDB();
const path = require('path');

function auth()
{
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };
passport.use(new JwtStrategy(opts,(jwt_payload,callback) => {
    const email = jwt_payload.email;
    User.findOne({email:email},(error,results) => {
        if(error){
            console.log("Invalid user from server");
            return callback(error,false)
        }
        if(results && results.length !== 0){
            console.log("Valid user");
            return callback(null,results);
        } else {
         console.log("InValid user");
         return callback('user not found!');
        }
      });
    }));
}


exports.auth = auth;
exports.checkAuth = (req, res, next) => {
  const {so_token} = req.cookies;
  req.headers.authorization = `Bearer ${so_token}`;
  return passport.authenticate('jwt', {session: false}, async (err, user) => {
    if (process.env.NODE_ENV === 'test') {
      // for testing only
      return next();
    }
    if (user && user._id) {
      req.user = user;
      return next();
    }
    res.status(401).json({message: "Not authorized to see this page. Please login!", status: 401});
  })(req, res, next);
};
// passport.authenticate("jwt",{ session :false });