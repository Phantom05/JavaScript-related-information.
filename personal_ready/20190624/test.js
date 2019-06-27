function elt(name,attributes){
  var node = document.createElement(name);
  if(attributes && typeof attributes !== "string"){
    for(var attr in attributes){
      if(attributes.hasOwnProperty(attr)){
        node.setAttribute(attr, attributes[attr]);
      }
    }
  }
  for(var i =2; i< arguments.length; i++){
    var child = arguments[i];
    if(typeof child == "string"){
      child = document.createTextNode(child);
    }
    node.appendChild(child);
  }
  return node;
}

// // var event= document.createEvent(type);
// var event = document.createEvent("HTMLEvents");
// event.initEvent("click",true,false);


// // EventTarget.dispatchEvent(event);

// var button = document.getElementById('button');
// button.addEventListener('click',function(event){
//   alert(`event.cancleable: ${event.cancelable}`);
// });
// button.dispatchEvent(event);

// console.log("A");
// setTimeout(() => {
//   console.log("B");
// }, 0);;
// console.log("C");

function sleep(Callback) {
  setTimeout(() => {
    Callback();
  }, 1000);
}


// sleep(function(){
//   console.log("A");
//   sleep(function(){
//     console.log("B");
//     sleep(function(){
//       console.log("C");
//     })
//   })
// });

// var promise = new Promise(function(resolve, reject){
//   setTimeout(() => {
//     var name = prompt("이름을 입력하십시오");
//     resolve(name)
//   }, 1000);
// });

// promise.then(function(name){
//   console.log(`안녕하세요, ${name} 님`);
// })


// var promise = new Promise(function(resolve, reject){
//   setTimeout(() => {
//     var n = parseInt(prompt("10 미만의 숫자를 입력하십시오"));
//     if(n <= 10){
//       resolve(n)
//     }else{
//       reject(`오류: ${n}`);
//     }
//     resolve(name)
//   }, 1000);
// });

// promise.then(function(num){
//   console.log(`2^${num} = ${Math.pow(2,num)}`);
// }).catch(function(err){
//   console.log(err);
// })


// var $document = $('body');
// $document.on("click mouseover", '.wow', ()=>{
//   console.log('hello wolrd');
// })


// var $zzz = $('.zzz');
// $zzz.on({
//   'click':function(){
//     console.log('click zzz');
//   },
//   "mouseover":function(){
//     console.log('over zzz');
//   }
// });


// 이벤트 딜리게이션
document.addEventListener('click', function (e) {
  console.log(e.target);
  if (e.target.className == "pure") {
    console.log('ss');
  }

});

document.querySelector('.pure').addEventListener('click', function (e) {
  e.stopPropagation();
})

// function buyAsync(mymoney) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(() => {
//       var payment = parseInt(prompt("지불하고자 하는 금액을 입력하십시오."));
//       var balance = mymoney - payment;
//       if (balance > 0) {
//         console.log(`${payment}원을 지불했습니다.`);
//         resolve(balance);
//       } else {
//         reject(`잔액은 ${mymoney}원입니다. 구매할 수 없습니다.`)
//       }
//     }, 1000);
//   })
// }

// buyAsync(500)
// .then(function(balance){
//   console.log(`잔액은 ${balance}원입니다.`);
//   return buyAsync(balance)
// }).then(function(balance){
//   console.log(`잔액은 ${balance}원입니다.`);
//   return buyAsync(balance)
// }).then(function(balance){
//   console.log(`잔액은 ${balance}원입니다.`);
//   return buyAsync(balance)
// }).catch(function(err){
//   console.log(err);
// })

function buyAsync(name,mymoney) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      var payment = parseInt(prompt(`${name}님, 지불하고자 하는 금액을 입력하십시오.`));
      var balance = mymoney - payment;
      if (balance > 0) {
        console.log(`${name}: ${payment}원을 지불했습니다.`);
        resolve(balance);
      } else {
        reject(`${name}: 잔액은 ${mymoney}원입니다. 구매할 수 없습니다.`)
      }
    }, 1000);
  })
}

// Promise.all([buyAsync("Tom",500), buyAsync("Huck",500), buyAsync("Becky",500)])
// .then(function(balance){
//   console.log(balance);
// })
// Promise.race([buyAsync("Tom",500), buyAsync("Huck",500), buyAsync("Becky",500)])
// .then(function(balance){
//   console.log(balance);
// })


function wait(ms) {
  console.log(ms);
  return new Promise(r => setTimeout(r, ms));
}

function doAxios(seq,coin){
  return axios({
    method: 'get',
    url: `https://api.bithumb.com/public/ticker/${coin}`,
    responseType: 'stream'
  })
    .then(function (response) {
      console.log(seq,response);
      console.log('in');
    });
}


// async function aa(){
//   await doAxios(1,'ALL');
//   await doAxios(2,'BTC');
//    console.log('world!');
// }
// aa()


// var toobar = elt("div");
// for(var name in controls){
//   toolbar.appendChild(controls[name](ctx));
// }


