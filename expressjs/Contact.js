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
    var firstname=req.query.fname;//101
    con.connect(checkConnection);
    con.query('select * from Contact where FirstName=?',[firstname],processResults);
    res.send(queryresults);
    }
app.get('/GetUserbyId',GetUserbyId);
function DisplayAllUser(req,res){
    con.connect(checkConnection);
    con.query('select * from Contact',processResults);
    res.send(queryresults);
}
app.get('/DisplayAllUser',DisplayAllUser);
function AddUser(req,res){
    var firstname=req.body.fname;//101
    var lastname=req.body.lname;//Aakash
    var Email=req.body.email;
    var phone=req.body.pnumber;
    var address=req.body.add;//Kumar
    con.connect(checkConnection);
    con.query('insert into Contact (FirstName,LastName,Email,PhoneNumber,Address) values(?,?,?,?,?)',[firstname,lastname,Email,phone,address],processResults);
    con.commit();
    res.send(queryresults);
}
app.post('/AddUser',bparserinit,AddUser);   
function UpdateUser(req,res){
    var firstname=req.body.fname;//101
    var lastname=req.body.lname;//Aakash
    var Email=req.body.email;
    var phone=req.body.pnumber;
    var address=req.body.add;//Kumar
    con.connect(checkConnection);
    con.query('update Contact set LastName=?,Email=?,PhoneNumber=?,Address=? where FirstName=?',[lastname,Email,phone,address,firstname],processResults);
    con.commit();
    res.send(queryresults);
}
app.put('/UpdateUser',bparserinit,UpdateUser);
function DeleteUser(req,res){
    var firstname=req.query.fname;//101
    con.connect(checkConnection);
    con.query('delete from Contact where FirstName=?',[firstname],processResults);
    con.commit();
    res.send(queryresults);
}
app.delete('/DeleteUser',DeleteUser);
function Login(req,res){
    var userId=req.query.id;
    var password=req.query.pass;
    con.connect(checkConnection);
    con.query('select * from User where userID=? and Password=?',[userId,password],processResults);
    res.send(queryresults);
}
app.get('/Login',Login);

