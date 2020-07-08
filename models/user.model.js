const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    user_id : {type : String, required : true, minlength : 8},
    name : {type : String, required: true},
    email : { type: String, trim: true, lowercase: true, unique: true, required: 'Email address is required', match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
    is_logged_in : {type : Boolean , default:false},
    phone_number : {type : String},
    password : {type : String, minlength : 8},
   
    user_image_url : {type : String},

},{timestamps: true});

userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password,bcrypt.genSaltSync(10));
    next();
});

module.exports = mongoose.model('User',userSchema);