// // window.onload = function(){
// //   var req = new XMLHttpRequest();

// //   req.onreadystatechange = function(){
// //     if(req.readyState ==4){
// //       if(req.state ==200){
// //         document.getElementById('view').innerHTML = req.responseText;
// //       }
// //     }
// //   };

// //   req.open('GET','data.txt');
// //   req.send(null);
// // };
// // // 뭘 공부하려면 공식문서부터 읽자.
// // // 공식문서를 읽으면서 내가 만들것을 같이 상상을 해야함.
// // // 이 예제가 내 프로젝트에는 어떻게 적용될지 생각해야함.
// // // API는 달달 외우는게 아니라, 원리를 이해해야함
// // // API는 쓰다보면 자연스레 외워짐


// // // 리액트 공부 순서
// // // 공식 문서를 읽는다.
// // // 튜토리얼을 따라해본다.
// // // 여기서 끝나면 최악
// // // 자신만의 프로젝트를 해본다(근데 튜토리얼 수준)
// // // 응용도 안됨.

// // // 1. 실제 서비스로 가능한 수준의 프로덕트를 만들어야함.
// // // 그래야 튜토리얼에 없는 에러들과 그 에러의 해결방법을 알게 됨
// // // 쉽지 않음, 시간적 여유 부족

// // // 2. 코드 피드백을 받아야함
// // // 피드백을 해줄 사람이 없음
// // // 우물 안 개구리 문제

// // // 3. 데이터를 많이 넣어야함
// // // 프론트는 최소 1000개에서 10000개까지 데ㅐ이터 만들어서 보내야함.
// // // 백엔드는 로드테스트
// // // 이렇게 해보면 실무 기술을 다 익힐수가 있음.

// // //무조건 완성을 해야함

// // // 조금씩 발전시켜 나가기 애자일
// // // 동기가 중요함*(없으면 어렵다고 생각함)


// // // 블로그를 만들어보기

// // // 코드 피드백을 받아야함
// // // 피드백을 해줄 사람이 없음.


// // // 오픈소스 활용 **
// // // 보일러 플레이트 소스 분석 **
// // // 보일러 플레이트에 컨트리뷰트하기


// // var req = new XMLHttpRequest();
// // console.log(`A : readyState = ${req.readyState}`);
// // req.onreadystatechange = function(){
// //   console.log(`B readState = ${req.readyState}`);
// // }
// // req.open("GET",'data.txt');
// // req.send(null);


// // var req = new XMLHttpRequest();
// // console.log(`A : readyState = ${req.readyState}`);
// // req.addEventListener('load',function(){
// //   document.getElementById('view').innerHTML = req.responseText;
// // })

// // req.open("GET",'data.txt');
// // req.send(null);



// var req = new XMLHttpRequest();
// console.log(`A : readyState = ${req.readyState}`);
// req.addEventListener('load',function(){
//   jsonObj = req.response
//   console.log(jsonObj);
// })
// req.responseType = 'json'

// req.open("GET",'data.json',true);
// req.send(null);



// function show(data){
//   console.log(`name: `+ data.name);
//   console.log(`price: ${data.price}`);
// }
// var url = "jsonp.js";
// var script = document.createElement('script');
// script.setAttribute('src',url);

// document.getElementsByTagName('head')[0].appendChild(script);


// function gelm(elm){
//   let elements = document.querySelectorAll(elm);
//   return (elements.length >1)?Array.from(elements):elements[0]
// }

// var frameWindow = gelm('#frame').contentWindow;
// var message = gelm('#message');
// var button = gelm('#button');

// var targetOrigin ='/';
// button.addEventListener('click',function(){
//   frameWindow.postMessage(message.value, targetOrigin);
// })

// function Card(suit,rank){
//  this.suit = suit;
//  this.rank = rank; 
// }

// Card.prototype.show = function(){
//   console.log(this.suit + this.rank);
// }

var Card = class{
  constructor(suit,rank){
    this.suit = suit;
    this.rank = rank
  }
  show(){
    console.log(this.suit+this.rank);
  }
}
var aaa = new Card('d','we');



function Person(name){
  Object.defineProperty(this, "name",{
    get:function(){
      return name;
    },
    set:function(newName){
      name = newName;
    },
    enumerable:true,
    configurable:true
  });
}
Person.prototype.sayName = function(){
  console.log(this.name);
}

var p = new Person("Tom");
console.log(p.name);
p.name = "Huck";
console.log(p.name);






function Ellipse(a,b){
  this.a = a;
  this.b = b;
}
Ellipse.prototype.getArea = function(){
  return Math.PI*this.a*this.b;
};

Ellipse.prototype.toString = function(){
  return `Ellipse  ${this.a} ${this.b}`;
}

function Circle(r){
  this.a = r;
  this.b = r;
}
Circle.prototype = Object.create(Ellipse.prototype, {
  constructor: {
    configurable:true,
    enumerable:true,
    value:Circle,
    writable:true
  }
})

console.dir(Circle);

Circle.prototype.toString = function(){
  return `Circle ${this.a} ${this.b}`
}
var circle = new Circle(2);



Circle.prototype = new Ellipse();
Circle.prototype.constructor = Circle;


var Circle = class Keris{

}

var Circle1 = class Keris{
  
}
console.log(Circle);
console.log(Circle1);

class Person2{
  constructor(name){
    this.name = name;
    Person.personCount++;
  }
  get name(){
    return this._name;
  }
  set name(value){
    this._name = value;
  }
  sayName(){
    console.log(this.name);
  }
  static count(){
    return Person.personCount;
  }
}
Person.personCount = 0;

var person1 = new Person2("Tom");
console.log(Person2.count());
var person2 = new Person2("Huck")
console.log(Person2.count());
console.dir(Person2);

/**
 * - 함수 객체의 인스턴스 맴버와는 달리 각 인스턴스에 따라 달라지지 않는 맴버 그룹을 
가리키며,인스턴스를 생성하지 않고 사용할 수 있어야 한다.

자바스크립트에서의 static 구현은 아래와 같이 함수 객체에 속성을 추가하는 방법으로 
구현한다.

또한, 이 방법은 자바스크립트 디자인 패턴중 하나인 메모제이션 패턴에서도 활용된다.

 */

 class Test{
  constructor(center,radius){
    console.log(radius,'radius');
    this.center =center;
    this.radius = radius;
  }
  area(){
    return Math.PI * this.radius * this.radius
  }
 }
 class Ball extends Test{
   move(dx,dy){
     this.center.x += dx
   }
 }

 var ball = new Ball({x:0,y:0},2);
 console.dir(Test);
 console.log(
  ball.area()
 );


 class Exten{
   constructor(center,radius){
     this.center = center;
     this.radius = radius;
   }
   area(){
     return Math.PI * this.radius * this.radius;
   }
   toString(){
     return `Circle 중심점 (${this.center.x},${this.center.y}) 반지름= ${this.radius}`
   }
 }

 class Eall extends Exten{
  move(dx,dy){
    this.center.x += dx;
    this.center.y += dy;
  }
  toString(){
    var str = super.toString();
    return str.replace("Circle",'Eall')
  }
 }
 var eall = new Eall({x:0,y:0},2);
 console.log(
  eall.toString()
 );