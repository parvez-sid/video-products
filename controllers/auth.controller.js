var passport = require('passport');
var LocalStrategy = require('passport-local');

var functions = require('../functions');
const userController = require('../controllers/user.controller');


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

exports.signupUser = (req, res, next) => {
    passport.authenticate('user_signup', (err, user, info) => {
        if (err) {
            req.message = "Can not registered.";
            return functions.sendErrorResponse(req, res, 400, req.message);
        }
        if (user) {
            if (user.status == 501) {
                return functions.sendErrorResponse(req, res, 400, user.msg);
            }
            if (user.status == 200) {
                req.message = user.msg;
                return functions.sendSuccessResponse(req, res, req.message);
                // res.send(req.message);
                // next();
                
            }
        }
        if (info) {
            return functions.sendErrorResponse(req, res, 400, info.message);
        }
    })(req, res, next);
}


passport.use('user_signup', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password'

},
    function (req, username, password, done) {
        userController.registerUser(req, username, password).then((user) => {
            if (user) {
                done(null, user);
            }
        }).fail(function (err) {
            done(null, err);
        });
    }
));