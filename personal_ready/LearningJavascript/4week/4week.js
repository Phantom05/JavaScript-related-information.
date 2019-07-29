
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

class Car extends Vehicle{
  constructor(){
    super();
    console.log(`Car created`);
  }
  deployAirbags(){
    console.log(`BWOOSH!`);
  }
}

