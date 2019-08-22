
console.log(`hello`);
var attributes = ['Numble','Perceptive','Generous'];
var html = `<ul><li>${attributes.join('</li></ul>')}</li></ul>`;
console.log(html);
var SYM = Symbol();
var o = {a:1,b:2,[SYM]:4}
Object.keys(o).forEach(prop=> console.log(prop));

console.clear();

// class Car{
//   constructor(make, model){
//     this.make = make;
//     this.model = model;
//     this._userGears = ['P','N','R','D'];
//     this._userGear = this._userGears[0];
//     //초기화를 여기에다가 해야하기 때문에.
//   }
//   get userGear(){
//     return this._userGear;
//   }
//   set userGear(value){
//     if(this._userGears.indexOf(gear) <0){
//       throw new Error(`Invalid gear : ${gear}`)
//     }
//     this._userGear = value;
//   }
//   shift(gear){
//     this.userGear = gear;
//   }
// }

// var car1 = new Car('Tesla','Model S');
// var car2 = new Car('Mazda','3i');

// console.log(
//   car1 instanceof Car
// );
// console.log(
//   car1 instanceof Array
// );


// console.log(car1)
// car1.shift('D')
// console.log(car1);
// car1.userGear = 'X'
// console.log(car1);



// function Car(make, model){
//   this.make = make;
//   this.model = model;
//   this._userGears = ['P','N','R','D'];
//   this._userGear = this.userGears[0];
// }

// class E6Car{}
// console.log(
//   typeof E6Car
// );

var Car = (function(){
  var carProps = new WeakMap();
  class Car{
    constructor(make,model){
      this.make = make;
      this.model = model;
      this._userGears = ['P','N','R','D'];
      carProps.set(this, {userGear:this._userGears[0]})
    }

    get userGear(){
      return carProps.get(this).userGear;
    }
    set userGear(value){
     if(this._userGears.indexOf(value) < 0){
       throw new Error(`Invalid gear: ${value}`)
     }
     carProps.get(this).userGear = value;
    }
    shift(gear){
      this.userGear = gear;
    }
  }
  var car1 = new Car('Tesla','3i');
  // car1.shift('D')
  var car2 = new Car();
  console.log(
    car1.shift === Car.prototype.shift
  );
  

})()
// WeakMap은 바깥에서 접근하면 안되는 프로퍼티를 안전하게 저장합니다.

class Car1{
  static getNextVin(){
    return Car1.nextVin++
  }
  constructor(make,model){
    this.make = make;
    this.model = model;
    this.vin = Car1.getNextVin()
  }
  static areSimilar(car1,car2){
    return car1.make === car2.make && car1.model === car2.model
  }
  static areSame(car1,car2){
    return car1.vin === car2.vin;
  }
}
Car1.nextVin = 0;

var car1 = new Car1('Tesla','S');
var car2 = new Car1('Mazda','3');
var car3 = new Car1('Mazda','3');

console.log(
  car1.vin
);
console.log(
  car2.vin
);
console.log(
  car3.vin
);

class Vehidle{
  constructor(){
    this.passengers= [];
    console.log(`Vehidle created`);
  }
  addPassenger(p){
    this.passengers.push(p);
  }
}

// class Car extends Vehicle{
//   constructor(){
//     super();
//     console.log(`Car created`);
//   }
//   deployAirbags(){
//     console.log(`BWOOSH!`);
//   }
// }

class Motorcycle extends Vehidle{};

class Super{
  constructor(){
    this.name = 'Super';
    this.isSuper = true;
  }
}
// 유효하지만, 권장하지는 않습니다.
Super.prototype.sneaky = `not recommended`;

class Sub extends Super{
  constructor(){
    super();
    this.name = 'Sub';
    this.isSub = true
  }
}

var obj = new Sub();

for(let p in obj){
  console.log(`${p}: ${obj[p]} ${obj.hasOwnProperty(p)?'':'(inherited)'}`);
}




class InsurancePolicy{}
function makeInsurable(o){
  o.addInsurancePolicy = function(p){ this.insurancePolicy = p; }
  o.getInsurancePolicy = function(){ return this.insurancePolicy ; }
  o.isInsured = function(){ return !!this.insurancePolicy ;}
}
class Car2{
  static getNextVin(){
    return Car1.nextVin++
  }
  constructor(make,model){
    this.make = make;
    this.model = model;
    this.vin = Car1.getNextVin()
  }
  static areSimilar(car1,car2){
    return car1.make === car2.make && car1.model === car2.model
  }
  static areSame(car1,car2){
    return car1.vin === car2.vin;
  }
}
makeInsurable(Car2.prototype)
// 프로토 타입에 객체를 선언해버림.
var car1 = new Car2()
car1.addInsurancePolicy(new InsurancePolicy());
// 이렇게되면 Car2를 상속받은 car1에서 makeInsurable에서 만들어진 메서드를 사용할 수 있음.
console.log(car1);



// var ADD_POLICY = Symbol();
// var GET_POLICY = Symbol();
// var IS_INSURED = Symbol();
// var _POLICY = Symbol();
// function makeInsurable(o){
//   o[ADD_POLICY] = function(p){ this[_POLICY] = p; }
//   o[GET_POLICY] = function(){return this[_POLICY]}
//   o[IS_INSURED] = function(){return !!this[_POLICY]}
// }


var u1 = {name:"Cynthia"};
var u2 = {name:"Jackson"};
var u3 = {name:"Olive"};
var u4 = {name:"James"};

var userRoles = new Map();
userRoles
.set(u1,'User')
.set(u2,'User')
.set(u3,'Admin');

console.log(userRoles.keys());
var userRoles = new Map([
  [u1,'User'],
  [u2,'User'],
  [u3,'Admin']
])
console.log(userRoles);
for(var u of userRoles.values()){
  console.log(u.name);
}
console.clear();
var SecretHolder = (function(){
  const secrets = new WeakMap();
  return class{
    setSecret(secret){
      secrets.set(this, secret);
    }
    getSecret(){
      return secrets.get(this);
    }
  }
})();


var a = new SecretHolder();
var b = new SecretHolder();

a.setSecret('secret A');
b.setSecret('secret B');

console.log(a.getSecret());
//일반적인 Map을 써도 되지만, 그렇게하면 SecretHolder 인스턴스에 저장한 내영은 가비지 컬렉션에 포함되지 않습니다.?

var bb = {
  a:1,
  b:2
}
for(var ab in bb){
  console.log(ab);
}

var c = [1,2,3,4,5];

c.reduce((a,b)=>{
  console.log(b);
},0);


function printMap(map){
  for(let [key,value] of map){
    console.log(`key: ${key}, value : ${value}`);
  }
}
var newMap = new Map([
  ['1','one'],
  ['2','two']
])
console.log(newMap);
let webs = new Map();
webs.set('1', 'React')
    .set('2', 'Angular2')
    .set('3', 'Vue')
    .set({a:1}, 'Redux');

console.log(webs);
// Expected console
// key: something, value: something

console.log(`webs.get('1'): ${webs.get('1')}`);
webs.forEach((value, key, obj) => {
  console.log(`key: ${key}, value: ${value}`);
});

var roles = new Set();
roles.add('User');
roles.add('Admin');
console.log(roles);


function validateEmail(email){
  return email.match(/@/)?
  email:
  new Error(`invaild email: ${email}`)
}
try{
  var email = 'janedoe.com';
  var validatedEmail = validateEmail(email);
  if(validatedEmail instanceof Error){
    console.error(`Error : ${validatedEmail.message}`)
  }else{
    console.log(`Vaild email : ${validatedEmail}`);
  }
}catch(err){
  console.error(`Error: ${err.message}`)
}
console.clear()
var book = [
  `Twinkle, twinkle, little bat!`,
  `How I wonder what you're at!`,
  `Up above the world you fly`,
  `Like a tea tray in the sky`,
  `Twinkle, twinkle, little bat!`,
  `How I wonder what you're at!`
]
var it = book.values();
console.log(
  it.next()
);

class Log{
  constructor(){
    this.messages = [];
  }
}