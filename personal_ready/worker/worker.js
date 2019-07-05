// var worker = new Worker("worker.js");

// worker.postMessage("message")


importScripts("prime.js");
onmessage = function(e){
  console.log('worker: message recieved');
  var message = e.data;
  var n = parseInt(message);
  console.log(this,'console.log(this)')
  this.postMessage(prime(n));
};


