const axios = require('axios');
// ttps://api.bithumb.com/public/ticker/BTC


let obj = {
  method: 'get',
  url: `https://api.bithumb.com/public/ticker/BTC`
}

const it = gen();
it.next();
function* gen() {
  const resultTestz = yield resultTest();
  const a = yield axTest(1);
  const b = yield axTest(2);
  const rolling = yield rollingPromise(50);
  const hellog = yield hello(a,b,rolling);
}

async function axTest(type) {
  if(type === 1){
    return await axios(obj).then(response => {
      console.log('Hello 1');
      console.log(response.data);
      response.data.name = 1;
      setTimeout(() => {
        it.next(response.data)
      }, 2000);
    })
  }
  if(type === 2){
    return await axios(obj).then(response => {
      console.log('World 2');
      console.log(response.data);
      response.data.name = 2;
      setTimeout(() => {
        it.next(response.data)
      }, 2000);
    })
  }
}

function resultTest(...data){
  console.log(`Result Data :`);
  console.log(data);
  setTimeout(() => {
    it.next()
  }, 0);
}
function hello(){
  console.log(`HELLO WORLD!`);
}
function rollingPromise(n){

  function t1(data){
    return new Promise(function(resolve,reject){
      setTimeout(() => {
        console.log(data,'[rolling] :  1');
        resolve(++data)
      }, 1000);
    })
    .then(x=>x)
  }
  function t2(data){
    return new Promise(function(resolve,reject){
      setTimeout(() => {
        console.log(data,'[rolling] :  2');
        resolve(++data)
      }, 1000);
    }).then(x=>x)
    .then(x=> x+10)
  }
  function t3(data){
    return new Promise(function(resolve,reject){
      setTimeout(() => {
        console.log(data,'[rolling] :  3');
        resolve(++data)
      }, 1000);
    })
  }
  function t4(data){
    return new Promise(function(resolve,reject){
      setTimeout(() => {
        console.log(data,'[rolling] :  4');
        resolve(++data)
      }, 1000);
    })
  }

  Promise.all([t1(n+5),t2(n+10),t3(n+3),t4(n+20)]).then(val=>{
    console.log(val);
    it.next(val);
    return ;
  })

}

