const express=require("express");
let router=express.Router();
let {User}=require("../../models/user");
var bcrypt=require('bcryptjs');
const _ =require("lodash");
const jwt=require("jsonwebtoken");
const config=require("config");
router.post("/register",async(req,res)=>{
    let user= await User.findOne({email:req.body.email});
    if(user) return res.status(400).send("User already exist wth given email");
     user=new User();
    user.name= req.body.name;
    user.email= req.body.email;
    user.password= req.body.password;
    await user.generateHashedPassword();
    await user.save();
    let token=jwt.sign({_id:user._id,name:user.name,role:user.role},config.get("jwtPrivateKey"));
    let datatoReturn={
        name:user.name,email:user.email,token:user.token
    }
    return res.send(datatoReturn);

});
router.post("/login",async(req,res)=>{
    let user= await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send("User Not Registered");
    let isvalid = await bcrypt.compare(req.body.password,user.password);
    if(!isvalid) return res.status(401).send("invalid password");
    let token=jwt.sign({_id:user._id,name:user.name,role:user.role},config.get("jwtPrivateKey"));
    res.send(token);


});
module.exports=router;