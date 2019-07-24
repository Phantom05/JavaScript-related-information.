
function hello({world}){
  return world
}
console.log(
  hello({world:5})
);

// const o = {
//   name:"Wallace",
//   speak(){
//     return `My name is ${this.name}`
//   }
// }


// console.log(
//   o.speak()
// );
var o = {
  name:"Julie",
  greetBackwards:function(){
    const self = this;
    function getReversName(){
      let nameBackwards = "";
      for(let i = self.name.length-1; i >=0 ; i--){
        nameBackwards += self.name[i];
      }
      return nameBackwards;
    }
    return `${getReversName()} si eman ym, olleH`
  }
}
console.log(
  o.greetBackwards()
);

var bruce = {name:"Bruce"};
var madeline = {name:"Madeline"};

// 이 함수는 어떤 객체에도 연결되지 않았지만 this를 사용합니다.
function greet(){
  return `Hello, I'm ${this.name}!`;
}

console.log(
  greet.call(bruce)
);

var x = 3;

function f(){
  console.log(x);
  console.log(y);
}
{
  var y = 5;
  f()
}

let globalFunc;
{
  let blockVar = 'a';
  globalFunc = function(){
    console.log(blockVar);
  }
}
globalFunc();

var f;
{
  var o = {note:"Safe"};
  f = function(){
    return o
  }
}
var oRef = f();
oRef.note = "Not so safe after all";
console.log(
  oRef
);