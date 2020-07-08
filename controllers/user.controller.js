var functions = require('../functions');
const userSchema = require('../models/user.model');
var Q = require('q');
var ObjectId = require('mongodb').ObjectID;


exports.registerUser = (req, email, password, res) => {
    var deferred = Q.defer();
    var Newuser = new userSchema({
        user_id : functions.randomIdGenerator(),
        name: req.body.name,
        email: email,
        phone_number: req.body.phone_number,
        password: password
    });
    Newuser.save((err, result) => {
        if (err) {
            if (err.code == 11000) {
                data = { status: 501, msg: 'Email is already exists, Please try login.' }
                deferred.reject(data);
            } else {
                data = { status: 501, msg: err.message }
                deferred.reject(data);
            }
        }
        else {
            data = {
                status: 200,
                msg: 'Successfully registered', result,
            }
            deferred.resolve(data);
        }
    })
    return deferred.promise;
};

// Get all users
exports.getUsers = (req, res) => {
    userSchema.find({}, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
};