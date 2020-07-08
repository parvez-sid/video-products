const productSchema = require('../models/product.model');

var functions = require('../functions');
var ObjectId = require('mongodb').ObjectID;
var db = require("../config/db.config");

exports.addProduct = (req, res) => {
    var productObj = new productSchema({
        product_name: req.body.product_name,
        video_title: req.body.video_title,
        video_url: req.body.video_url
    })

    productObj.save((err, result) => {
        if (err) {
            return functions.sendErrorResponse(req, res, 400, 'Invalid JSON.');
        } else {
            return functions.sendSuccessResponse(req, res, result);
        }
    });
}

// get all products
exports.getProducts = (req, res) => {
    productSchema.find()
    .then(products => {
        return functions.sendSuccessResponse(req, res, products);
    }).catch(err => {
        return functions.sendErrorResponse(req, res, 500, err);
    });
}

exports.editProduct = (req, res) => {
    var product_id = req.params.pid;
    productSchema.findOne({_id : product_id}, (err, result) => {
        if(err) {
            if(err.kind === 'ObjectId') {
                return functions.sendErrorResponse(req, res, 404, 'Product not found with id ' + req.params.pid);            
            }
        }
        
        if(result){
            var fieldForUpdate = {};
            if (req.body.product_name) fieldForUpdate.product_name = req.body.product_name;
            if (req.body.video_title) fieldForUpdate.video_title = req.body.video_title;
            if (req.body.video_url) fieldForUpdate.video_url = req.body.video_url;

            var query = { _id: ObjectId(product_id) };
            var data = { $set: fieldForUpdate };
            productSchema.updateOne(query, data).exec((err, response) => {
                if (err) {
                    return functions.sendErrorResponse(req, res, 400, 'Product not updated, please try again.');
                }
                if (response.n == 1) {
                    var message = 'Product update successfully.';
                    return functions.sendSuccessResponse(req, res, message);
                }
            })
        }
    })
}
exports.deleteProduct = (req, res) => {
    var product_id = req.params.pid;
    var query = { _id: ObjectId(product_id) };
    var values = { $set: { is_deleted: true } };
    db.collection("products").updateOne(query, values, (err, response) => {
      if (err) {
        if(err.kind === 'ObjectId') {
            return functions.sendErrorResponse(req, res, 404, 'Product not found with id ' + req.params.pid);            
        }
      }
      else {
        if (response.result.n == 1)
          functions.sendSuccessResponse(req, res, "Product deleted successfully.");
        if (response.result.n == 0)
          functions.sendErrorResponse(req, res, 400, "Product not deleted, try again!");
      }
    });
};