const express=require("express");
let router=express.Router();
const validateProduct=require("../../middlewares/validateProduct");
const auth=require("../../middlewares/auth");
const admin=require("../../middlewares/admin");
var  {  Product}=require("../../models/product");
//get all
router.get("/", async(req,res)=>{ 
    console.log(req.user);
    let page=Number(req.query.page? req.query.page:1);
    let perPage=Number(req.query.page? req.query.page:10);
    let skipRecord=perPage*(page-1);
    let products=await Product.find().skip(skipRecord).limit(perPage);
return res.send(products);
});
// get single
router.get("/:id",async(req,res)=>{ 
  try{   let product=await Product.findById(req.params.id);
    if(!product)
     return res.status(400).send("No prodcut Found with given ID");
return res.send(product);}
catch(err){
    return res.status(400).send("invalid ID") ;
}
});
 router.put("/:id" ,auth,admin,validateProduct,async(req,res)=>{
     let product= await Product.findById(req.params.id);

     product.name=req.body.name;
     product.price=req.body.price;
     product.address=req.body.address;
     product.number=req.body.number;
     await product.save();
     return res.send(product);

 });
 router.delete("/:id",auth,admin ,async(req,res)=>{
   
    try{    let product= await Product.findByIdAndDelete(req.params.id);
        if(!product)
         return res.status(400).send("No prodcut Found with given ID");
    return res.send(product);}
    catch(err){
        return res.status(400).send("invalid ID") ;
    }
    
    return res.send(product);

});
router.post("/" ,validateProduct,auth,async(req,res)=>{
   
    let product= new Product();
    product.name=req.body.name;
     product.price=req.body.price;
     product.address=req.body.address;
     product.number=req.body.number;
     await product.save();

    
    return res.send(product);

});
module.exports=router;