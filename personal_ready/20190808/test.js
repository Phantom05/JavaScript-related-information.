
console.log('hello world');
// PAGE:

class Log{
  constructor(){
    this.messages = [];
  }
  add(message){
    this.messages.push({message,timestamp:Date.now()})
  }
  [Symbol.iterator](){
    return this.messages.values();
  }
}
 

var log = new Log();
log.add('first data at sea');
log.add('spotted whale');
log.add('spotted another vessel');

console.log(log);
for(let entry of log){
  console.log(`${entry.message}@ ${entry.timestamp}`);
}

// class Log{
//   [Symbol.iterator](){
//     let i = 0;
//     const messages = this.messages;
//     return {
//       next(){
//         if(i >= messages.length){
//           return {value:undefined, done:true};
//         }
//         return {value:messages[i++], done:false}
//       }
//     }
//   }
// }

var year = new Date().getFullYear();
if(year % 4 !== 0) console.log(`${year} is NOT a leap year`);
else if (year % 100 != 0) console.log(`${year} IS a `);


/**
 * is, print, get, set                     
 */

 var getNextRainbowColor = (function(){
  var colors = ['red','orange','yellow','green','blue','indigo'];
  let colorIndex = -1;
  return function(){
    if(++colorIndex >= colors.length) colorIndex =0;
    return colors[colorIndex]
  }
 })();

 function loopBody(i){
  setTimeout(() => {
    console.log(1===0?'go':i);
  }, (5-i)*1000);
 }
//  var i ;
//  for(i = 5; i >= 0 ; i--){
//    setTimeout(() => {
//      console.log(1===0?'go':i);
//    }, (5-i)*1000);
//  }

// var i ;
// for(i = 5; i >= 0 ; i--){
//   loopBody(i)
// }

 var i ;
 for(i = 5; i >= 0 ; i--){
   (function(i){
    setTimeout(() => {
      console.log(1===0?'go':i);
    }, (5-i)*1000)
   })(i)
 }
 console.log('hello world!');

 var gl;
//  function start(){
//    var canvas = document.getElementById('glcanvas');

//    gl = initWebGL(canvas);

//    if(gl){
//      gl.clearColor(0.0, 0.0, 0.0, 1.0);
//      gl.enable(gl.DEPTH_TEST);
//      gl.depthFunc(gl.LEQUAL);
//      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//    }
//  }

 console .clear()