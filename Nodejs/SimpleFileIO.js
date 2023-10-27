var files=require('fs');
files.writeFile('Akash.txt','Welcome to NodeJS MathanKumar',function(err,data){
    if(err !=undefined){
        console.log(err.message);
        console.log(err.code);
    }else{
        console.log('Write'+data+'characters to the file');
    }
    
})
files.readFile('Akash.txt','utf-8',function(err,data){
    if(err !=undefined){
        console.log(err.message);
        console.log(err.code);
    }else{
        console.log(data);
    }
})