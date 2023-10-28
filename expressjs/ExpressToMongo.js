var express = require("express");
var app = express();
var mon = require("mongoose");
var dot = "dotenv";
var bparser=require('body-parser');
var bparserinit=bparser.urlencoded({extended:false});
var cors=require('cors');
app.use(cors());
mon.connect(
    "mongodb://127.0.0.1:27017/local?directConnection=true&serverSelectionTimeoutMS=2000&appName=ExpressToMongo+2.0.2"
  )
  .then(() => {
    console.log("Connected to DB");
  }).catch((err) => {
    console.log(err);
  });
  app.listen(9990,function(error){
    if(error==undefined){
        console.log("Connected to server");
    }
    else{
        console.log("Error Code:"+error.errno);
        console.log("Message:"+error.Message);
    }
  });
  //Select Database
 var db=mon.connection.useDb("local");
 //Display the name of selected dtatbase
console.log(db.name);
//Define the structure of the Collection
 const userSchema={
    UserId:Number,
    Password:String,
    Email:String};
 var userData=mon.model('users',userSchema);
 //prepare the data to be inserted 
 
 //insert the data into the collection 
 //Use save function to insert

 function getUser(req,res){
    userData.find().then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })}
    app.get('/getUser',getUser);
function addUser(req,res){
    var udata= new userData({UserId:req.body.id,Password:req.body.pass,Email:req.body.email});
    udata.save().then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}
app.post('/addUser',bparserinit,addUser);
function updateUser(req,res){
   var uData=userData.findOne({UserId:req.body.id});
    uData.updateOne({$set:{Password:req.body.pass,Email:req.body.email}}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}
app.put('/updateUser',bparserinit,updateUser);
function deleteUser(req,res){
  
    userData.deleteOne({UserId:req.body.id}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    })
}
app.delete('/deleteUser',bparserinit,deleteUser);
function loginUser(req,res){
  let UserId=req.body.id;
  let Password=req.body.pass;
  userData.find({UserId:UserId,Password:Password}).then((data)=>{
      res.send(data);
  }).catch((err)=>{
      console.log(err);
  })
}
app.get('/loginUser',bparserinit,loginUser);

