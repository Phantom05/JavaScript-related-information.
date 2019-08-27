


function countdown(seconds){
  return new Promise(function(resolve,reject){
    for(let i = seconds; i >=0; i--){
      setTimeout(() => {
        if(i === 13) return reject(new Error(`Oh my god`));
        if(i>0) console.log(`${i} ...`);
        else resolve(console.log('Go!'))
      }, (seconds - i) *1000);
    }
  });
}

// const p = countdown(14);
// p.then(function(){
//   console.log(`countdown completed successfully`);
// });
// p.catch(function(err){
//   console.log(`countdown experiend an error: ${err.message}`);
// })



// const c = new Countdown(5,true);
// // on 이 이벤트를 주시하는 부분임.
// c.on('tick', function(i){
//   if(i>0) console.log(`${i} ...`);
// });

// // go로 카운트다운 시작.
// c.go()
// .then(function(){
//   console.log('GO!');
// })
// .catch(function(err){
//   console.error(err.message)
// })


const EventEmitter = require('events').EventEmitter;

class Countdown extends EventEmitter{
  constructor(seconds, superstitious){
    super();
    this.seconds = seconds;
    this.superstitious = !!superstitious; // 값이 있을때.
    console.log(!!superstitious);
  }

  go(){
    const countdown = this;
    const timeoutIds = [];
    return new Promise(function(resolve,reject){
      for(let i = countdown.seconds; i >= 0; i--){
        timeoutIds.push(setTimeout(function(){
          if(countdown.superstitious && i ===13){
            timeoutIds.forEach(clearTimeout);
            return reject(new Error(`Oh my god`))
          }
          countdown.emit(`tick`,i); // emit 이름 으로보내면 on으로 소환됨.
          if(i === 0) resolve();
        }, (countdown.seconds -i) * 1000));
      }
    })
  }
}

function addTimeout(fn,timeout){
  if(timeout === undefined) timeout = 1000;
  return function(...args){
    return new Promise(function(resolve,reject){
      const tid = setTimeout(reject,timeout,new Error(`promise time out`));
      fn(...args).then(function(...arg){
        clearTimeout(tid);
        resolve(...args);
      })
      .catch(function(...args){
        clearTimeout(tid);
        reject(...args);
      });
    });
  }
}

function launch(){
  return new Promise(function(resolve,reject){
    if(Math.random() < 0.5) return ; //문제가..
    console.log(`Lift off!`);
    setTimeout(() => {
        resolve(`In orbit!`)
    }, 2*1000);
  })
}

const c = new Countdown(1,true).on('tick', i=> console.log(`${i} ...`));
c.go()
.then(addTimeout(launch,11*1000))
.then(function(msg){
  console.log(msg);
})
.catch(function(err){
  console.error(`Houston, we have a proble ${err.message}`)
}) // 어디에 넣어도 도중 에러가발생하면 carch로 넘어오게됨.