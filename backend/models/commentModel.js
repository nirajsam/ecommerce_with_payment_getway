const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    productId:{ type: String, required: true},
    email:{ type: String, required: true},
    comment:{ type: String, required: true},
    date:{type:String,default:`${new Date().getUTCDate()}/${new Date().getUTCMonth()}/${new Date().getUTCFullYear()}`},
    
});

const commentModel =mongoose.model( "review", commentSchema);

module.exports= commentModel;
console.log(commentModel)