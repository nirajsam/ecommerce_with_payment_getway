const express = require('express');
const Order = require('../models/orderModel')
const Product = require('../models/productModel');
const paytmChecksum = require('../paytm/checkSum');

const https = require('https');
const router = express.Router();

router.get("/", async(req,res)=>{
    const order = await Order.find({});
    res.send(order)
    //console.log(products)
});

router.post('/', async (req, res) =>{
    const order = new Order({
        name:req.body.name,
        email:req.body.email,
        products:req.body.productsAr,
        ids:req.body.ids,
        address:req.body.address,
        paymentMode:req.body.pMode
    });
    var x=req.body.ids;
    console.log(x)
    Object.keys(x).map((id,index)=>{
        Product.findOne({_id:id}).then((res)=>{
            console.log(res.countInStock)
        if(res.countInStock>x[id]){
            Product.updateOne({_id:id},{$inc:{countInStock:-x[id]}}).then((res)=>{
                console.log(res)
            })
        }else{
            Product.deleteOne({_id:id}).then((res)=>{
                console.log(res)
            })
        }
        })    
    })
    const newOrder = await order.save()
    if(newOrder){
        res.send("successfully ordered")
    
    }else{
        res.status(401).send({msg:'Invalid user data'})
    }
})
router.get('/payment',async (req, res) =>{
    var paytmPay={
        "MID":"epxyRR17938320018306",
        "WEBSITE":"WEBSTAGING",
        "INDUSTRY_TYPE_ID":"Retail",
        "CHANNEL_ID":"WEB",
        "ORDER_ID":req.query.orderId,
        "CUST_ID":"cid",
        "MOBILE_NO":req.query.phone_number,
        "EMAIL":req.query.email,
        "TXN_AMOUNT":req.query.amount,
        "CALLBACK_URL":`http://localhost:5000/api/orders/callback`,
    }
    // console.log(paytmPay)
    // Checksum_lib.generateSignature(paytmPay,"gNIu1SvxLtdOW#pL",function(err,checksum){
    //     console.log("checksum",checksum)
    //     var params={
    //         ...paytmPay,
    //         CHECKSUMHASH:checksum
    //     }
    //     console.log(params)
    //     res.send(params)
    // })
    var paytmChecks = paytmChecksum.generateSignature(paytmPay, "gNIu1SvxLtdOW#pL");
    paytmChecks.then(function(checksum){
            console.log("generateSignature Returns: " + checksum);
            var params={
                ...paytmPay,
                CHECKSUMHASH:checksum
            }
            // console.log(params)
            res.json(params)
        }).catch(function(error){
            console.log(error);
        });
    
})
router.post('/callback',async (req, res) =>{

    var payChecksum="";
    var received_data=req.body
    var paytmParams={}
    console.log(received_data)
    for(var key in received_data){
        // console.log(key)
        if(key=="CHECKSUMHASH"){
            payChecksum=received_data[key]
        }else{
            paytmParams[key]=received_data[key]
        }
    }
    // console.log(paytmParams)
    // console.log(payChecksum)
    var isValidChecksum=paytmChecksum.verifySignature(paytmParams, "gNIu1SvxLtdOW#pL", payChecksum)
    if (isValidChecksum) {
        console.log("Checksum Matched");
        // res.send(received_data)
        res.redirect(`http://localhost:3000/home/placeorder/${received_data.STATUS}`)
        
        
        
        // /**
        // * import checksum generation utility
        // * You can get this utility from https://developer.paytm.com/docs/checksum/
        // */
                

        // /* initialize an object */
        // var paytmParams = {};

        // /* body parameters */
        // paytmParams.body = {

        //     /* Find your MID in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys */
        //     "mid" : received_data[req.body.MID],

        //     /* Enter your order id which needs to be check status for */
        //     "orderId" : received_data[req.body.ORDER_ID],
        // };

        // /**
        // * Generate checksum by parameters we have in body
        // * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
        // */
        // paytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "gNIu1SvxLtdOW#pL").then(function(checksum){
        //     /* head parameters */
        //     paytmParams.head = {

        //         /* put generated checksum value here */
        //         "signature"	: checksum
        //     };

        //     /* prepare JSON string for request */
        //     var post_data = JSON.stringify(paytmParams);

        //     var options = {

        //         /* for Staging */
        //         hostname: 'securegw-stage.paytm.in',

        //         /* for Production */
        //         // hostname: 'securegw.paytm.in',

        //         port: 443,
        //         path: '/order/status',
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Content-Length': post_data.length
        //         }
        //     };

        //     // Set up the request
        //     var response = "";
        //     var post_req = https.request(options, function(post_res) {
        //         post_res.on('data', function (chunk) {
        //             response += chunk;
        //         });

        //         post_res.on('end', function(){
        //             console.log('Response: ', response);
        //             res.json(JSON.parse(response))
        //         });
        //     });

        //     // post the data
        //     post_req.write(post_data);
        //     post_req.end();
            
        // });

        
    } else {
        console.log("Checksum Mismatched");
        res.redirect(`http://localhost:3000/home/placeorder/${received_data.STATUS}`)
        
        
    }
    
})
// PaytmChecksum
module.exports=router