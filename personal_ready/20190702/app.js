window.addEventListener('load',function(){
  console.log('app.js excute');
  new SpinboxController();
})


class Person{
  constructor(name){
    this.name = name;
    Person.personCount++;
  }
  // prototype 메서드
  get name(){
    return this._name;
  }
  set name(value){
    this._name = value;
  }
  sayName(){
    console.log(this.name);
  }
  static getCount(){
    return Person.personCount;
  }
}
Person.personCount = 0;
var person1 = new Person("Tom");
console.log(Person.getCount());
var person2 = new Person("Huck");
console.log(Person.getCount());


class Test{
  constructor(){

  }
  toString(){
    return 'toSt'
  }
}

class Allie extends Test{
  toString(){
    var str = super.toString();
    return str
  }
}
var ttt = new Allie();
console.log(
  ttt.toString()
);