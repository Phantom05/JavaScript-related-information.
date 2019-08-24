console.log('hello world');

// const fs = require('fs');

// fs.readFile('a.txt',function(err,dataA){
//   if(err) console.error(err);
//   console.log(dataA);
// })

function countdown(seconds){
  return new Promise(function(resolve,reject){
    for(let i = seconds; i >= 0; i--){
      setTimeout(() => {
        if(i>0) console.log(`${i}...`);
        else resolve(console.log('Go!'))
      }, (seconds -i)*1000);
    }
  })
}

// countdown(5).then(function(){
//   console.log(`countdown completed successfully`);
// },function(err){
//   console.log(`countdown experienced an error ${err.message}`);
// })

function t1(data){
  return new Promise(function(resolve,reject){
    setTimeout(() => {
      console.log(data,'1');
      resolve(++data)
    }, 1000);
  })
}
function t2(data){
  return new Promise(function(resolve,reject){
    setTimeout(() => {
      console.log(data,'2');
      resolve(++data)
    }, 1000);
  })
}
function t3(data){
  return new Promise(function(resolve,reject){
    setTimeout(() => {
      console.log(data,'3');
      resolve(++data)
    }, 1000);
  })
}
function t4(data){
  return new Promise(function(resolve,reject){
    setTimeout(() => {
      console.log(data,'4');
      resolve(++data)
    }, 1000);
  })
}

// t1(5)
// .then(t2)
// .then(t3)
// .then(t4)
// .then(function(data){
//   console.log('res',data);
// })



function doPromise(){

}
doPromise.prototype.wait = function(fn){
  new Promise(function(resolve,reject){
    resolve()
  })
  return this
}

// new doPromise()
// .wait(test1())
// .wait(test2())

function test1(){
  setTimeout(() => {
    console.log('aaa1');
    return 5
  }, 1000);
}
function test2(){
  setTimeout(() => {
    console.log('aaa2');
    return 5
  }, 1000);
}

function* myGen(){
  const x = yield 1;
  const y = yield (x+1);
  const z= yield (y+2);
  return x+y+z
}
let g = myGen();
console.log(
  g.next()
);
console.log(
  g.next(5)
);
console.log(
  g.next(10)
);
console.log(
  g.next(5)
);
console.log(g.next());



// const iterator = orderCoffee('010-1010-1111');
let ret;

// (function runNext(val) {
//     ret = iterator.next(val);

//     if (!ret.done) {
//         ret.value.then(runNext);
//     } else {
//         console.log('result : ', ret.value);
//     }
// })();



function getUsersFromDataDase(){
  return new Promise(function(resolve,reject){
    setTimeout(() => {
      resolve('hello');
    }, 1000);
  })
}
// function init(){
//   getUsersFromDataDase().then(
//     result =>{
//       const users = result;
//       // Do something with const users...
//     }
//   );
//   // Other similar data initialization...
// }

function* gererator(){
  const users = yield getUsersFromDataDase();
  return (users + ` Correctly received`);
}

const iit = gererator();
const iteration = iit.next();

console.log(
  iteration
);

// iteration.value.then(
//   resovedValue => {
//     resovedValue Test Users
//     const nextIteration = iteration.next(resovedValue);

//     nextIteration
//   }
  
// )






//  14   34
//  3 10 

console.clear();
  // let flat = v.reduce((x,y)=>{x.push(y[0],y[1]);return x},[]);
// let tmp = flat.reduce((x,y)=>{ (x.indexOf(y) !== -1)?null:x.push(y); return x },[]);

rt = (fn) => (x,y) =>{fn(x,y);return x};

rmOverlap = (arr) =>arr.reduce(rt((x,y)=>(x.includes(y))
  ?x.splice(x.indexOf(y),1)
  :x.push(y)),[])[0];

solution =(v) => v.reduce(rt((x,y)=>{
  x[0].push(y[0]);
  x[1].push(y[1]);
}),[[],[]])
.reduce(rt((x,y)=>x.push(rmOverlap(y))),[]);


console.log(
  solution( 	[ [ 1, 1 ], [ 2, 2 ], [ 1, 2 ] ] )
);

function soultion2(data){
  let [x,y] = data.split(" ").map(Number),res = ''
  for(;y--;) res += ('*'.repeat(x)+'\n');
  return res
}
console.log(
  soultion2('5 3')
);

