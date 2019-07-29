
// var r1 = 5;
// var r2 = 3 - -r1;
// console.log(r2);

// var x1 = 0;
// var x2 = 3;
// var x3 = -1.5;
// var x4 = -6.33;
// console.log(-x1*1);
// console.log(+x2*2); 
// console.log(+x3*3);
// console.log(-x4*4);

// var x =2;
// var x1 = x++ + x++;
// var x2 = ++x + ++x
// var x3 = x++ + ++x;
// var x4 = x5= (x1 + -x2 - -x3);
// console.log(x4);

// var n = 0;
// while(true){
//   n += 0.1;
//   if(Math.abs(n-0.3) < Number.EPSILON) break;
// }
// console.log(`Stopped at ${n}`);


// function isEqual(a, b){
//   return Math.abs(a - b) < Number.EPSILON;
// }

// console.log(
//   // nisEqual(0.3,0.3)
// );
// // sIsEqual()
// // oIsEqual()
// var jangoFett = {
//   occupation: "Bounty Hunter",
//   genetics: "superb"
// };

// var bobaFett = {
//   occupation: "Bounty Hunter",
//   genetics: "superb"
// };
// function isEquivalent(a, b) {
//   var aProps = Object.getOwnPropertyNames(a);
//   var bProps = Object.getOwnPropertyNames(b);
//   if (aProps.length != bProps.length) return false;
//   for (var i = 0; i < aProps.length; i++) {
//     var propName = aProps[i];
//     if (a[propName] !== b[propName]) return false;
//   }
//   return true;
// }

// console.log(isEquivalent(jangoFett , bobaFett));
// console.log(
//   isEquivalent( [1,2,3], [1,2,3])
// );

// var a = true;
// var b = 2;
// var c = a && b;
// console.log(c);


console.clear();
var arr = [1];
arr.length = 0
console.log(arr);

var obj = {b:2, c: 3, d:4};
var a, b, c;
({a,b,c} = obj)
console.log(a,b);

var arr = [1,2,3,4,5];
var [x,y,...rest] = arr;
console.log(x,y,rest);


function f(o){
  o.message = 'f에서 수정함';
  o = {
    message:"새로운 객체"
  }
}


 var o = {
   message:'초기값'
 }

 f(o)
 console.log(o);


 var arr = [];
 arr[5] =5;
 console.log(arr.length);

 var arr = [1,2,3,4];
//  arr.copyWithin(1,2);
 arr.copyWithin(2,0,2)
 console.log(arr),'f';

// 첫번쨰 요소는 복사한 요소를 붙여 넣을 위치
// 두번쨰 요소는 복사를 시작할 위치
// 세변째 매겨번수는 복사를 끝낼 위치
var obj = {a:1};
var arr =[1,obj];
console.log(
  arr.indexOf(obj)
);

arr.find(function(list){
  console.log(this);
},{})

console.clear();
var arr = [5,7,2,4];
var sum = arr.reduce((a,x)=> a+= x,0)
console.log(sum);

var words = ["Beachball","Rodeo","Angel",'Aardvark'];
var alphabetical = words.reduce((a,x)=> {
  if(!a[x[0]]) a[x[0]] = [];
  a[x[0]].push(x)
  return a;
},{})

console.log(alphabetical);

var words = ["Beachball", "Rodeo", "Angel","Papaya"];
var longWords = words.reduce((a,w) => w.length >= 6 ? a + " " + w : a,"").trim();
console.log(longWords);
