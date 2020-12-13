const express = require('express');
const Comment = require('../models/commentModel')
const router = express.Router();

router.get('/getComment/:productId', async (req, res) =>{
    //console.log(req.params.productId)
    const commentProduct = await Comment.find({
        productId: req.params.productId
    })
    //console.log(commentProduct)
    const commentCount = await Comment.find({
        productId: req.params.productId
    }).count()
    if(commentProduct){
        res.send({
            commentData:commentProduct,
            countComment:commentCount
        })
    }else{
        res.status(401).send({msg:'noOne comment on this'})
    }
})

router.post('/commentOn', async (req, res) =>{
    const comment = new Comment({
        email:req.body.email,
        productId:req.body.productId,
        comment:req.body.comment
    });
    const newComment = await comment.save()
    //console.log(newComment)
    if(newComment){
        res.send({
            email:newComment.email,
            productId:newComment.productId,
            comment:newComment.comment,
        })
    
    }else{
        res.status(401).send({msg:'error in comment'})
    }
})

module.exports=router