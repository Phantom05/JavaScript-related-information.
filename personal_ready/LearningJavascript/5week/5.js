
 function addNumber(...n){
  // console.log(n.reduce((a,y)=>a+y));
  return n.reduce((a,y)=>a+y)
 }
 var f = addNumber;
 console.log(
  f(1,2,3,6,5,3)
 );

 var sin = Math.sin;
 var cos = Math.cos;
 var theta = Math.PI/4;
 var zoom = 2;
 var offset = [1, -3];

 var pipeline = [
   function rotate(p){
     return {
       x:p.x * cos(theta) - p.y * sin(theta),
       y:p.x * sin(theta) + p.y * cos(theta),
     };
   },
   function scale(p){
     return {
      x:p.x * zoom,
      y:p.y * zoom
     };
   },
   function translate(p){
     return {
       x:p.x + offset[0],
       y:p.y + offset[1]
     };
   }
 ]
 var p ={x:1, y:1};
 var p2 = p;
 for(let i = 0; i <pipeline.length; i++){
   console.log(p2);
   p2= pipeline[i](p2);
 }
console.log(p2);
// 함수를 3개를 한번에 실행할때 재밌을거 같음.
// 배열에 이미 선언된 함수 3개를 넣고 사용해도 될듯.

function rotate1(p){
  return {
    x:p.x * cos(theta) - p.y * sin(theta),
    y:p.x * sin(theta) + p.y * cos(theta),
  };
}
function scale1(p){
  return {
   x:p.x * zoom,
   y:p.y * zoom
  };
}
function translate1(p){
  return {
    x:p.x + offset[0],
    y:p.y + offset[1]
  };
}
var pipeline = [rotate1,scale1,translate1];
var p ={x:1, y:1};
pipeline.map(fn=> p = fn(p));
console.log(p); 

function _map(arr,fn=y>y){
  return arr.map(a=>fn(a,a))
}

console.log(
  _map([1,2,3],Math.pow)
);
function sum(arr,f = x=>x){
  // 함수가 전달되지 않았으면 매개변수를 그대로 반환하는 null 함수를 씁니다.
  // if(typeof f != 'function') f = x =>x;
  return arr.reduce((a,x)=> a+= f(x),0)
} 

console.log(
  sum([1,2,3])
);
console.log(
  sum([1,2,3],x=> Math.pow(x,3))
);

function sumOfSquares(arr){
  return sum(arr,x=>x+x);
}
console.log(
  sumOfSquares([1,2,3,4])
);
// 이렇게되면 sum을만들어서 유동성있게하고, sumOfSquares로 더 잘게 편하게 할 수 있음.
// 1가지 매개변수만 받도록.
function newSummer(f){
  return arr => sum(arr,f);
}
//이렇게 함수를 지정해서 함수로 만들어놓게되면 sum을 나눠서 만들수도 있음.

var sumOfSquaress = newSummer(x=>x+x);
var sumOfCubes = newSummer(x => Math.pow(x,3));

console.log(
  sumOfSquaress([1,2,3])
);