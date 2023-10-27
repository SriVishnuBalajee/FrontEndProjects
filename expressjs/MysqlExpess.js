var mysql=require('mysql');
var exp=require('express');
var app=exp();
var bparser=require('body-parser');
var bparserinit=bparser.urlencoded({extended:false});
var cors=require('cors');
app.use(cors());
app.use(exp.json());
 const con=mysql.createConnection({
    localhost:"localhost",
    user:"root",
    password:"root",
    database:"world",
    port:3306   
});
function checkConnection(error){
    if(error==undefined){
        console.log("connected");
    }
    else{
        console.log("Error Code:"+error.errno);
        console.log("Message:"+error.Message);
    }
}  

function feedback(error){
    if(error==undefined){
        console.log("Connected successfully");
        
    }
    else{
        console.log("Error Code:"+error.errno)

}
}
app.listen(9999,feedback);
var queryresults=undefined;
function processResults(error, result) {
    queryresults = result;
    console.log("Result: "+result);
}
function GetUserbyId(req,res){
    var userId=req.query.id;//101
    con.connect(checkConnection);
    con.query('select * from User where userID=?',[userId],processResults);
    res.send(queryresults);
    }
app.get('/GetUserbyId',GetUserbyId);
function GetUserbyEmail(req,res){
    var Email=req.query.email;//101
    con.connect(checkConnection);
    con.query('select * from User where EmailID=?',[Email],processResults);
    res.send(queryresults);
}
app.get('/GetUserbyEmail',GetUserbyEmail);
function DisplayAllUser(req,res){
    con.connect(checkConnection);
    con.query('select * from User',processResults);
    res.send(queryresults);
}
app.get('/DisplayAllUser',DisplayAllUser);
function AddUser(req,res){
    var userId=req.body.id;//101
    var password=req.body.pass;//Aakash
    var Email=req.body.email;//Kumar
    con.connect(checkConnection);
    con.query('insert into User (userID,Password,EmailID) values(?,?,?)',[userId,password,Email],processResults);
    con.commit();
    res.send(queryresults);
}
app.post('/AddUser',bparserinit,AddUser);
function UpdateUser(req,res){
    var userId=req.body.id;//101
    var password=req.body.pass;//Aakash
    var Email=req.body.email;//Kumar
    con.connect(checkConnection);
    con.query('update User set Password=?,EmailID=? where userID=?',[password,Email,userId],processResults);
    con.commit();
    res.send(queryresults);
}
app.put('/UpdateUser',bparserinit,UpdateUser);
function DeleteUser(req,res){
    var userId=req.query.id;//101
    con.connect(checkConnection);
    con.query('delete from User where userID=?',[userId],processResults);
    con.commit();
    res.send(queryresults);
}
app.delete('/DeleteUser',DeleteUser);
