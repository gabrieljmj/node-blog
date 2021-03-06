var passport  = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , userModel = require('../models/users')
  , bcrypt    = require('bcrypt-nodejs');

passport.use('local', new LocalStrategy(
{
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback : true 
},
function (req, username, password, done) {
    userModel.findOne({username: username}, function (err, user) {
        if (err) {
            done(err);
        }

        if (!user) {
            return done(null, false, req.flash('login-err', 'User not found'));
        }

        bcrypt.compare(password, user.password, function (err, res) {
            if (err) {
                console.log('Error: ' + err)
                res.redirect('/');
            }

            if (res) {
                return done(null, user);
            }

            return done(null, false, req.flash('login-err', 'Incorrect password'));
        });

        return done(null, user);
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passport;