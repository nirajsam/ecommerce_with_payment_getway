const express = require('express');
const Product = require('../models/productModel')
const router = express.Router();
// const  {getToken,isAuth, isAdmin} = require('../util');
const fs = require('fs')

router.get("/", async(req,res)=>{
    const products = await Product.find({});
    res.send(products)
    //console.log(products)
});
router.get("/:id", async(req,res)=>{
    const products = await Product.findOne({_id:req.params.id});
    //console.log(products)
    if(products){
        res.send(products)
    }else{
        res.status(404).send({message:"Product Not Found"})
    }
    //console.log(products)
});
router.get("/findP/:pName", async(req,res)=>{
    const products = await Product.find({'name': {'$regex':req.params.pName,$options:'i'}},{});
    //console.log(products)
    if(products){
        res.send(products)
    }else{
        res.status(404).send({message:"Product Not Found"})
    }
    //console.log(products)
});
router.get("/selectP/:name/:sort?", async(req,res)=>{
    if(req.params.sort==="asc"){
        const products = await Product.find({'category': {'$regex':req.params.name,$options:'i'}},{}).sort({"price":1});
        if(products){
            res.send(products)
        }else{
            res.status(404).send({message:"Product Not Found"})
        }
    }else if(req.params.sort==="des"){
        const products = await Product.find({'category': {'$regex':req.params.name,$options:'i'}},{}).sort({"price":-1});
        if(products){
            res.send(products)
        }else{
            res.status(404).send({message:"Product Not Found"})
        }
    }else{
        const products = await Product.find({'category': {'$regex':req.params.name,$options:'i'}},{});
        if(products){
            res.send(products)
        }else{
            res.status(404).send({message:"Product Not Found"})
        }
    }
    //console.log(req.params.name)
   
   //console.log(products)
   
   //console.log(products)
});



router.post("/", async(req,res)=>{
    const product = new Product({
       name: req.body.name,
       price: req.body.price,
       image: req.body.image,
       brand: req.body.brand,
       category: req.body.category,
       countInStock: req.body.countInStock,
       description: req.body.description,
       rating: req.body.rating,
       numReviews: req.body.numReviews, 
    })
    
    const newProduct= await product.save();
    if(newProduct){
        return res.status(201).send({msg:"new product created", data:newProduct})
    }
    return res.status(500).send({message:'error in creating product'})
})

router.put("/:id", async(req,res)=>{
    const productId = req.params.id;
    const product = await Product.findOne({_id:productId});
    if(product){
        product.name=req.body.name;
        product.price=req.body.price;
        product.image=req.body.image;
        product.brand=req.body.brand;
        product.category=req.body.category;
        product.countInStock=req.body.countInStock;
        product.description=req.body.description;
        const updatedProduct= await product.save();
        if(updatedProduct){
            return res.status(200).send({msg:" product updated", data:updatedProduct})
        }
        return res.status(500).send({message:'error in updating product'})
    
    }
   })
router.delete("/:id", async (req,res)=>{
    const deleteProduct = await Product.findById(req.params.id);
    
    if(deleteProduct){
        await deleteProduct.remove();
        try {
            for (let index = 0; index < deleteProduct.image.length; index++) {
                fs.unlinkSync(`../../Ekart_project/frontend/public/${deleteProduct.image[index]}`);    
            }
            
           } catch (e) {
            console.log(e)
           }
        res.send({message:"product Deleted"});
    } else {
        res.send("Error in Deletion")
    }
})

// router.put("/updateRating/:id/:val",async(req,res)=>{
//     //console.log(req.params.id)
//     let value=Number(req.params.val)
//     //console.log(typeof(value))
//     // const nor=await Product.find({rating:{$gt:0}},{}).count();
//     // const value=val/nor
//     const updateProduct = await Product.updateOne({_id:req.params.id},{$inc:{rating:value}})
//     if(updateProduct){
//         console.log("successful update")
//     }else{
//         console.log("error")
//     }
// })
module.exports=router