const express = require('express');
const Rate = require('../models/rateModel')
const router = express.Router();

router.get('/getRate/:productId', async (req, res) =>{
    //console.log(req.params.productId)
    const rateProduct = await Rate.find({
        productId: req.params.productId
    })
    let sum=0;
    for (let index = 0; index < rateProduct.length; index++) {
        sum=sum+rateProduct[index].rate    
    }
    
    const countRate=await Rate.find({productId: req.params.productId}).count()
    const overallRate=sum/countRate;
    //console.log(overallRate)
    if(rateProduct){
        //console.log(rateProduct)
        res.send({
            rate:overallRate,
            countRate:countRate
        })
    }else{
        res.status(401).send({msg:'getRate error'})
    }
})

router.post('/rateUs', async (req, res) =>{
    
    const newRate = await Rate.updateOne({productId: req.body.productId,
        email:req.body.email},{$set:{rate:req.body.rate}},{upsert:true})
    if(newRate){
        res.send({
            email:req.body.email,
            productId:req.body.productId,
            rate:req.body.rate,
        })
    
    }else{
        res.status(401).send({msg:'post rate error'})
    }
})

module.exports=router