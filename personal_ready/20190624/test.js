
// // var event= document.createEvent(type);
// var event = document.createEvent("HTMLEvents");
// event.initEvent("click",true,false);


// // EventTarget.dispatchEvent(event);

// var button = document.getElementById('button');
// button.addEventListener('click',function(event){
//   alert(`event.cancleable: ${event.cancelable}`);
// });
// button.dispatchEvent(event);

console.log("A");
setTimeout(() => {
  console.log("B");
}, 0);;
console.log("C");

function sleep(Callback){
  setTimeout(() => {
    Callback();
  }, 1000);
}


sleep(function(){
  console.log("A");
  sleep(function(){
    console.log("B");
    sleep(function(){
      console.log("C");
    })
  })
});

var promise = new Promise(function(resolve, reject){
  setTimeout(() => {
    console.log("A");
    resolve()
  }, 1000);
})