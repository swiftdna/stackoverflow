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
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
passport.use(new JwtStrategy(opts,(jwt_payload,callback) => {
    const email = jwt_payload.email;
    User.findOne({email:email},(error,results) => {
        if(error){
            console.log("Invalid user from server");
            return callback(error,false)
        }
        if(results.length !== 0){
            console.log("Valid user");
            callback(null,results);}
            else {
                console.log("InValid user");
                callback(null,results);}
        });
    }));
}


exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt",{session :false});