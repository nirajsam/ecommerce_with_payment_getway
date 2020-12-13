const mongoose = require('mongoose')

const rateSchema = new mongoose.Schema({
    productId:{ type: String, required: true},
    email:{ type: String, required: true},
    rate:{ type: Number, required: true},
    
});

const rateModel =mongoose.model( "rate", rateSchema);

module.exports= rateModel;
console.log(rateModel)