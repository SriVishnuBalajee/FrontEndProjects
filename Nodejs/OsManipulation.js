var osinfo=require('os');
console.log(osinfo.arch());
console.log("CPUs :"+osinfo.cpus());
console.log("Count Of CPUs :"+osinfo.cpus().length);
console.log("Free Memory :"+osinfo.freemem());
console.log("Total Memory :"+osinfo.totalmem());
console.log("Your Machine Name :"+osinfo.hostname());
console.log("Platform :"+osinfo.platform());
console.log("Release :"+osinfo.release());
console.log("Uptime :"+osinfo.uptime());
console.log("version :"+osinfo.version());