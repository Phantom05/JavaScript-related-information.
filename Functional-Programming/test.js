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
// function _filter(users, predi) {
//   //필터는 응용형 함수, 원하는 시점에 조절할 수 있는 함수
//   var new_list = [];
//   for (var i = 0; i < users.length; i++) {

//     if (predi(users[i])) {
//       new_list.push(users[i]);
//     }

//   }
//   return new_list;
//   //콘솔로 소통하지 않고 리턴으로 소통하는게 좋다.
// }
// console.log(
//   _filter(users, function (user) { return user.age >= 30;})
// )

console.log('map')
// 3. map
//다형성이 높고 데이터를 함수에서 전혀 찾아볼 수 없게됨. 완전히 분리가됨
// function _map(list,mapper) {
//   var new_list = [];
//   for (var i = 0; i < list.length; i++) {
//     new_list.push(mapper(list[i]))
//   }
//   return new_list
// }

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

console.log(
  _map([1,2,3],function(num){return num*2})
);





// 컬렉션 중심 프로그래밍의 4가지 유형과 함수

// 1. 수집하기 - map, values, pluck 등
// 2. 거르기 - filter, reject, compack, widthout 등
// 3. 찾아내기 - find, some, every 등
// 4. 접기 = reduce, min, max, group_by, count_by





// let inputElm = _filter(Array.from(document.querySelectorAll(`#testForm *`)),function(elm){
//   return elm.nodeName == 'INPUT'
// });
// console.log(
//   inputElm[0].type = 'password'
// )


// 컬렉션



// console.log(
//   _filter(users, function (user) {return user.age < 30; })
// )



// console.log(
//   _filter([1, 2, 3, 4], function (num) { return num % 2 }),
//   _filter([1, 2, 3, 4], function (num) { return !(num % 2) })
// );




console.log(
  [1,2,3].map(function(val){ return val* val})
);
console.log(
  [1,2,3].filter(function(val){return val % 2})
);
// 기존의 map 과 filter는 메서드임. 순수함수가 아님.
// 또한 객체 지향 프로그래밍임.

//객체지향은 반드시 객체가 생겨야 메서드를 사용 가능하기 때문에, 평가 시점이 중요하다
try{
  console.log(
    document.querySelectorAll('*').map(function(node){
      return node.nodeName;
    })
  );
}catch(e){
  console.log(e)
}

// 반면 함수형 코드의 경우 함수가 이미 존재하기 때문에 평가시점이 훨씬 유연하게 된다.
console.log(
  _map(document.querySelectorAll('body'),function(node){ return node.nodeName})
);
// 다형성 면에서 좋다.


// 3. 내부 다형성
// 1. predi, iter, mapper
_map([1,2,3,4],function(v){ //두번째 인자는 보조함수, 내부함수의 다형성이 중요, 내부 다형성.
  return v+20
})
// 보통 두번째 인자로 함수가 들어가면 콜백함수라고 부르는 경우가 많은데./
// 함수의 역할의 이름을 따로 불러중요 하는것이 중요하다. 맵퍼이든지 이터이든지 프리디이든지.


// 커링 -> 원하는 인자의 조건이 채워졌을때 본체를 실행



var add = _curry(function(a ,b ){
  return a+b;
});

var add10 = add(10);
console.log(add10(5));
console.log(add(5)(10));

var add5 = add(5);
console.log(add5(50));
// 원하는 시점까지 미뤄뒀다가 원하는 시점에서 실행하는 기법. 함수형 프로그래밍은 ㄹㅇㄹㅇ이렇게 조합해 나가는 것임.

console.log(add(10,20))


var sub = _curryr(function(a ,b ){
  return a-b;
});

console.log(sub(10,5));
var sub5 = sub(5);
console.log(sub5(10));// 이경우 10에서 5를 빼야하는데 표현이 조금 이상 함. 위의 커리함수의경우 왼쪽에서부터 적용해나가는데 이럴때 오른쪽에서 적용하는 curryr 이라는 함수로 적용하는게 좋다.

//2. _get만들어 좀 더 간단하게 하기

var user1 = users[0];
// console.log(user1.name); // 만약 user1이 없다면 에러가나게된다
console.log(_get(user1,'name')); // _get을 사용하게되면 undefinded을 반환하게 된다.
console.log(_get('name')(user1));
var get_name = _get('name');
console.log(get_name(user1));
console.log(get_name(users[3]));


console.log(                                    
  _map(
    _filter(users,function(user){return user.age >= 30}),
    _get('name')
  ),
);

console.log(
  _map(
    _filter(users,function(user){return user.age <30}),
    _get('age')
  )
);

function __curry(fn){
  return function(a){
    return function(b){
      return fn(a,b)
    }
  }
}


var add = __curry(function(a,b){
  return a+b;
});


var num5 = add(5);
console.log(
  num5(10)
);


var {a:x,b:y} = {a:55 ,b:2};
console.log(x,y);

var {a:x=1,b:y=20,c:z=30} = {a:2,b:5};
console.log(x,y,z);

var zip = new Set();
zip.add('131-52352');
zip.add('5543-3462');
console.log(zip);
zip.delete('131-52352');
console.log(zip);
var zip = new Set(['131-8634',"556-0002"]);
var iter = zip.keys();
console.log(iter);
for(var v of iter) console.log(v);
var iter = zip.entries();
console.log(iter);