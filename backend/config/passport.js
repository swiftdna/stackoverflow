const bCrypt = require('bcrypt-nodejs');

module.exports = (passport) => {
	const collection = COREAPP.db.collection('users');
	const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });

	passport.use('local-signup', new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        }, async (req, username, password, done) => {
            const generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            const userObj = await collection.findOne({
                username: username
            });
            // console.log('userObj -> ', userObj);
            if (userObj) {
                return done({
                    message: 'That username is already taken'
                }, false);
            } else {
                const userPassword = generateHash(password);
                const data = {
                    email: req.body.email,
                    password: userPassword,
                    username: username
                };
                const newUser = await collection.insertOne(data);
                if (newUser.acknowledged) {
                    return done(null, newUser);
                }
                return done(null, false);
            }
        }
    ));

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with username
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        async (req, username, password, done) => {
            const collection = COREAPP.db.collection('users');
            const isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            try {
                const user = await collection.findOne({
                    username: username
                });
                if (!user) {
                    return done(null, false, {
                        message: 'username does not exist'
                    });
                }
                if (!isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                return done(null, user);
            } catch(e) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            }
        }
    ));
}