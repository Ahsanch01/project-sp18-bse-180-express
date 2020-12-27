var mongoose=require("mongoose");
const joi=require("@hapi/joi");
var productSchema=mongoose.Schema({
    name:String,
    price:Number,
    address:String,
    number:Number,
})

var Product=mongoose.model("Product",productSchema);

function validateProduct(data){
    const Schema=joi.object({
        name:joi.string().min(3).max(12).required(),
        address:joi.string().required(),
        price:joi.number().min(0).required(),
        number:joi.number().required(),
    });
    return Schema.validate(data,{abortEarly:false});}

module.exports.Product=Product;
module.exports.validate=validateProduct;
