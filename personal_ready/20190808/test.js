console.log('hello world');

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