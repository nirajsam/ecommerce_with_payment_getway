const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    name:{ type: String, required: true},
    email:{ type: String, required: true},
    date:{type:String,default:`${new Date().getDate()}/${new Date().getUTCMonth()}/${new Date().getUTCFullYear()}`},
    products:{ type: Object, required: true},
    ids:{ type: Object, required: true},
    address:{type: Object, required: true},
    email:{ type: String, required: true},
    paymentMode:{ type: String, required: true},
});

const orderModel =mongoose.model( "orders", orderSchema);

module.exports= orderModel;
console.log(orderModel)