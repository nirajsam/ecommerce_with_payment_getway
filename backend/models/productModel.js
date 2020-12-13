const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{ type: String, required: true},
    image:{ type: Array, required: true},
    brand:{ type: String, required: true},
    price:{ type: Number, default:0, required: true},
    category:{ type: String, required: true},
    countInStock:{ type: Number, default:0, required: true},
    description:{ type: String, required: true},
    rating:{ type: Number, default:0, required: true},
    numReviews:{ type: Number, default:0, required: true},
    date:{type:String,default:`${new Date().getDate()}/${new Date().getUTCMonth()}/${new Date().getUTCFullYear()}`},
});

const productModel =mongoose.model( "product", productSchema);

module.exports= productModel;
console.log(productModel)