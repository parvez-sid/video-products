const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var productSchema = new Schema({
    product_name : {type : String, required: true},
    video_title : {type : String, required: true},
    video_url : {type : String, required: true},
    is_deleted : {type : Boolean, default : false}
},{timestamps: true});

module.exports = mongoose.model('Product',productSchema);