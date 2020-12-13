const express=require('express')
const data= require('./data.json')
const config= require('./config')
const dotenv = require('dotenv')
const bodyParser= require('body-parser')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');
const productRoute = require('./routes/productRoute')
const commentRoute = require('./routes/commentRoute')
const rateRoute = require('./routes/rateRoute')
const upload = require('express-fileupload')
const fs = require('fs')

dotenv.config();

const mongodbUrl = config.MONGODB_URL
mongoose.connect(mongodbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).catch(error=>console.log(error.reason))

const cors=require('cors')
const app=express();
app.use(cors())
app.use(upload())
const options = {
    inflate: true,
    limit: 1000,
    extended: true
  };

app.use(bodyParser.urlencoded(options));
app.use(bodyParser.json())


app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/comment", commentRoute);
app.use("/api/rate", rateRoute);
app.use("/api/orders", orderRoute);
//console.log("sam")
// app.get("/api/products/:id",(req,res)=>{
//     const productId = req.params.id;
//     const product = data.products.find(x=>x._id===productId);
//     if(product){
//         res.send(product)
//     }else{
//         res.status(404).send({msg:"product Not found"})
//     }
//     res.send(data.products);
// });
// app.get('/',(req,res)=>{
//     res.sendFile(__dirname+'/index.html')
// })
 app.post('/upload',(req,res)=>{
     console.log(req.files)
     if(req.files == null){
         return res.status(400).json({msg:'no file uploaded'})
     }
     const file = req.files.file;
     var fName=[];
     var fPath=[]
     for (let index = 0; index < file.length; index++) {
         fName.push(file[index].name)
         fPath.push(`/images/${file[index].name}`)    
     }
     console.log(fPath)
     console.log(fName)
     let x=0
     for (let i = 0; i < file.length; i++) {
        file[i].mv(`E:/Ekart_project/frontend/public/images/${file[i].name}`,err =>{
            if(err){
                console.error(err);
                return res.status(500).send(err);
            }
            x+=1
           //  res.json({fileName:file.name, filePath:`/images/${file[0].name}`})
        })
         
     }
     
        res.json({fileName:fName, filePath:fPath})
     
    //  file[0].mv(`E:/Ekart_project/frontend/public/images/${file[0].name}`,err =>{
    //      if(err){
    //          console.error(err);
    //          return res.status(500).send(err);
    //      }
    //     //  res.json({fileName:file.name, filePath:`/images/${file[0].name}`})
    //  })
    //  file[1].mv(`E:/Ekart_project/frontend/public/images/${file[1].name}`,err =>{
    //     if(err){
    //         console.error(err);
    //         return res.status(500).send(err);
    //     }
        
    // })
 })
 

app.listen(5000, ()=>{
    console.log("server started")
})