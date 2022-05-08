const User = require('../models/user');

const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const {secret} = require('../utils/config');
const bcrypt = require('bcryptjs');
const {auth} = require('../utils/passport');
auth();

const signup = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {
    const { email,password } = req.body;

    const existingUsername = await User.findOne({
      email: email
    });

    if (existingUsername) {
      res.status(400).json({
        message: 'Username already exists.'
      });
    }

    const newUser = new User({email,password});
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    const savedUser = await newUser.save();

    if (savedUser) {

      const { email, role, id, created, profilePhoto,location,lastseen } = savedUser;
      const userInfo = {
        email,
        role,
        id,
        created,
        profilePhoto,
        location,
        lastseen
      };

     res.json({
        message: 'User created!',
        userInfo
      });
    } else {
      res.status(400).json({
        message: 'There was a problem creating your account.'
      });
    }
  } catch (error) {
    res.status(400).json({
      message: 'There was a problem creating your account.'
    });
  }
};

const login = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    res.status(422).json({ errors });
  }
  try {
    const { email, password } = req.body;
    await User.findOneAndUpdate({email:email},{email:email,lastseen:Date.now()},{upsert:true, new:true});
    const user = await User.findOne({
      email: email
    }, {}, {lean: true});
    if (!user) {
      res.status(403).json({
        message: 'Wrong username or password.'
      });
    }

    //const passwordValid = await verifyPassword(password, user.password);
    bcrypt.compare(password, user.password, function(err, isMatch){
      if (err) {
          throw err
        } else if (!isMatch) {
          res.status(403).json({
            message: 'password did not match'
          });
        } else {
          const payload = {id : user.id,email : user.email};
          const token = jwt.sign(payload,secret, {
           expiresIn: 10080000
          });
          res.cookie('so_token', token, { httpOnly: true });
          res.status(200).json({token: "JWT " + token, data :user});
        }
      });
    }  
 catch (error) {
    return res.status(500).json({
      message: 'Something went wrong.'
    });
  }
};

module.exports = {
	signup,
	login
};