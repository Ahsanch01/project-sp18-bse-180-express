var mongoose=require("mongoose");
const joi=require("@hapi/joi");
var bcrypt=require('bcryptjs');
const { string } = require("@hapi/joi");
var userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"user",
    },
   
});
userSchema.methods.generateHashedPassword= async function(){
    let salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt); 

}

var User=mongoose.model("User",userSchema);

function validateUser(data){
    const Schema=joi.object({
        name:joi.string().min(3).max(12).required(),
        email:joi.string().email().required(),
        password:joi.string().min(0).max(10).required(),
       
    });
    return Schema.validate(data,{abortEarly:false});}

    function validateUserLogin(data){
        const Schema=joi.object({
            
            email:joi.string().email().required(),
            password:joi.string().min(0).max(10).required(),
           
        });
        return Schema.validate(data,{abortEarly:false});}

module.exports.User= User;
module.exports.validate=validateUser;
module.exports.validateUserLogin=validateUserLogin;
