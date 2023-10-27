const { dir } = require('console');
var files=require('fs');
var fdesc=0;
//open(<fileNo>,<mode>,<callbackFunction>)
//ModeOfOpening Can be: 'r' for read, 'w' for write, 'a' for append;
files.open('Demo.txt','a',function(err,fd){            //Opens the file in write mode.
    if(err !=undefined){
    console.log(err.message);
    console.log(err.code);
    }else{
        console.log('File opened successfully.');
        console.log(fd);
        fdesc=fd;
    }

var str=new Buffer.from('\n Welcome to NodeJS MathanKumar');
console.log(fdesc);
//Write(<fileNo>,<data>,<startingPositionInBuffer>,<lengthOfDataToWrite>,<Encoding | null>,<callbackFunction>)
files.write(fdesc,str,0, str.length,null, function(err,written){
    console.log('Wrote' +written+'characters to the file');
})
files.close(fdesc, function(){
    console.log('File closed successfully.')
});
});