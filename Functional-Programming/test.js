function add(a, b) {
  return a + b; // 순수함수 
  //원래 있던 값들은 그대로 두고, 새로운 값들을 리턴하는 식으로 함수하는게 함수형 프로그래밍.
}
console.log(add(10, 5));
console.log(add(10, 5));
console.log(add(10, 5));

// 이런식으로 외부의 결과로인해 다른 결과가 나오게되면 순수함수가 아님.
var c = 10; // 여기선 항상 동일한 인자를 준다고 한상 동일한 값을 반환하지 않음. c가 바뀌는 순간 결과가 달라지게됨. 이러면 순수함수가 아님. 순수함수는 평가한 시점이 중요하지 않아야함.
function add2(a, b) {
  return a + b + c;
}

console.log(add2(10, 2));
console.log(add2(10, 3));
console.log(add2(10, 4));
c = 20; // 이걸 기점으로 달라지기 때문에 안전하지 않은 함수임.
// 순수함수의경우 언제 호출하든 안전하게 들어가기 때문에 안전한 함수로 평가됨.
console.log(add2(10, 2));
console.log(add2(10, 3));
console.log(add2(10, 4));


var c = 20;

function add3(a, b) { // 부수효과가 있음
  c = b; // 외부의 상태에 영향을 미치면 부수효과이고 순수함수가 아님
  return a + b; // return, 출력 외에 외부 상태에 관련을 주고있음.
}
console.log(`c: `, c)
console.log(add3(20, 30));
console.log(`c: `, c)
console.log(add3(20, 30));
console.log(add3(20, 30));

var obj1 = {
  val: 10
};

function add4(obj, b) {
  obj.val += b; // 리턴값도 없고 부수효과인 함수임.
}
// 이런식들로 코딩하는것은 순수함수가 아니고 그리 좋지않음.
console.log(obj1.val);
add4(obj1, 20)
console.log(obj1.val);

// 다시 순수 함수
// 순수함수는 평가시점이 중요하지 않다.
var obj1 = {
  val: 10
};

function add5(obj, b) {
  return {
    val: obj.val + b
  } //obj.val를 참조만 할뿐 값을 직접 변형하진 않고 새로운 객체를 반환함으로써 새로운 객체를 반환함.
  //외부상태도 변경하지 않고 인자로 받은 값도 변경하고있지않음.
}
console.log(obj1.val);
var obj2 = add5(obj1, 20);
console.log(obj1.val);
console.log(obj2.val);

// 함수형 프로그래밍
// 모든 값들을 변형시키지 않고
// 외부상태를 변경시키지않고 값을 다뤄나가는 프로그래밍

console.clear()
/** 일급 함수 */

var f1 = function (a) {
  return a * a;
};
console.log(f1);

var f2 = add;
console.log(f2);

function f3(f) {
  return f();
}
console.log(f3(function () {
  return 10;
}));
console.log(f3(function () {
  return 20;
}));

// add_maker
function add_maker(a) {
  return function (b) {
    return a + b;
  }
}

var add10 = add_maker(10);
console.log(add10(20));
var add5 = add_maker(5);
var add15 = add_maker(15);
console.log(add5(10), add15(10));

console.log(add10(20));
console.log(add10(20));

function f4(f1, f2, f3) {
  return f3(f1() + f2())
}
console.log(
  f4(
    function () {
      return 2;
    },
    function () {
      return 1;
    },
    function (a) {
      return a * a
    }
  )
);


function 윗집(x, y, z) {
  return z(x(), y())
}

console.log(
  윗집(
    function () {
      return `의자끄는소리 데미지 50`
    },
    function () {
      return `발뒷꿈치소리 데미지 10`
    },
    function (...arg) {
      let res = arg.reduce((x, y) => {
        return x + (+y.replace(/[^0-9]/g, ''));
      }, 0)
      return `아랫집 스트레스 데미지 ${res*res}`
    }
  )
);
console.clear()

var users = [{
    id: 1,
    name: 'ID',
    age: 36
  },
  {
    id: 2,
    name: 'BJ',
    age: 32
  },
  {
    id: 3,
    name: 'JM',
    age: 32
  },
  {
    id: 4,
    name: 'PJ',
    age: 27
  },
  {
    id: 5,
    name: 'HA',
    age: 25
  },
  {
    id: 6,
    name: 'JE',
    age: 26
  },
  {
    id: 7,
    name: 'JI',
    age: 31
  },
  {
    id: 7,
    name: 'MP',
    age: 23
  },
];
//
var temp_users = [];
for (var i = 0; i < users.length; i++) {
  if (users[i].age >= 30) {
    temp_users.push(users[i]);
  }
}
console.log(temp_users);
//
var names = [];
for (var i = 0; i < temp_users.length; i++) {
  names.push(temp_users[i].name)
}
console.log(names);
//
var temp_users = [];
for (var i = 0; i < users.length; i++) {
  if (users[i].age < 30) {
    temp_users.push(users[i]);
  }
}
console.log(temp_users);
//
var ages = [];
for (var i = 0; i < temp_users.length; i++) {
  ages.push(temp_users[i].age)
}
console.log(ages);


// 2._filter
function _filter(users, predi) {
  //필터는 응용형 함수, 원하는 시점에 조절할 수 있는 함수
  var new_list = [];
  for (var i = 0; i < users.length; i++) {

    if (predi(users[i])) {
      new_list.push(users[i]);
    }

  }
  return new_list;
  //콘솔로 소통하지 않고 리턴으로 소통하는게 좋다.
}
// console.log(
//   _filter(users, function (user) { return user.age >= 30;})
// )

console.log('map')
// 3. map
//다형성이 높고 데이터를 함수에서 전혀 찾아볼 수 없게됨. 완전히 분리가됨
function _map(list,mapper) {
  var new_list = [];
  for (var i = 0; i < list.length; i++) {
    new_list.push(mapper(list[i]))
  }
  return new_list
}

var over_30 = _filter(users,function(user){return user.age >= 30});
console.log(over_30);

var names = _map(over_30,function(user){
  return user.name
});
console.log(names);

var under_30 = _filter(users,function(user){return user.age < 30});
var ages = _map(under_30,function(user){
  return user.age
})
console.log(ages);


// console.log(
//   _filter(users, function (user) {return user.age < 30; })
// )



// console.log(
//   _filter([1, 2, 3, 4], function (num) { return num % 2 }),
//   _filter([1, 2, 3, 4], function (num) { return !(num % 2) })
// );
