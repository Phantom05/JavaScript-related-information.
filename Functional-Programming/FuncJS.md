# Functional Programming
>순수함수
```
let c = 10;
function add2(a, b) {
    return a + b + c;
  }
console.log(add2(10, 10));
```
함수의 원형을 변경시키지 않고 외부로 받은 인자를 새로운 값으로 리턴해주는 것을 순수함수라고 한다 만약 위의 코드에서 return하기 전에 c = b 이렇게 외부의 값을 완전히 바꿔버린다면 이것은 부수효과이며, 순수함수가 아니다.

> 부수효과
```
# 1
let c = 10
function add3(a, b) {
    c = b; 
    return a + b;
  }
console.log(c);
console.log(add3(10, 5));
console.log(c);

# 2
 var obj1 = {
      val: 10
    };

function add4(obj, b) {
    obj1.val += b;
  }
console.log(obj1.val);
add4(obj1, 20);
console.log(obj1.val)
    //인자의 상태를 직접 변경함.
```
c = 5
 // 이렇게 return 왜에 다른값을 변경해주는것을 부수효과라고 하고 부수효과가 들어가면 순수함수가 아님 하지만 c의 상태가 변경되기 때문에 순수함수가 아니라고 하는것임.

>위의 상황을 순수함수식으로 변경한다면.
```
//다시 순수 함수
    var obj1 = {
      val: 10
    }

    function add5(obj, a) {
      return {
        val: obj.val + a
      }
    }
    console.log(obj1.val);
    console.log(add5(obj1, 10))
    console.log(obj1.val);
```
  //이렇게 되면 인자로 받은 값을 변경시키지 않으면서 새로운 객체를뽑아낼 수 있음 이게 함수형 프로그램의 장점

  //언제 어디서 실행되도 동일한 값을 내기 때문에 매우 좋음. 매우 안전함


  >일급함수
```
var f1 = function (a) {
      return a * a;
    }
    console.log(f1);
    //함수도 변수에 담을 수 있음.
 ```
  
```
function f3(f) {
      return f();
    }
    console.log(f3(()=> {
      return 70;
    }))
```
//함수를 인자로 넘기게되면 들어가는값에 따라 다르게 나옴.

> /* add maker */
//함수를 리턴하는 함수
```
  function add_maker(a){
      return function(b){
        return a+b;
      }
    }


```
  // 순수함수를 사용함.
```
    var add10 = add_maker(10);
    console.log(add10(20));

    function f4(f1,f2,f3){
      return f3(f1()+f2());
    }

    console.log(
    f4(
      function(){return 2;},
      function(){return 1;},
      function(a){return a*a}
    ))
```

//함수형 프로그래밍은 이런식으로 하는 패러다임임.

  duck.moveLeft() //이런식으로 쓰는건 데이터 기준이구

  moveLeft(dog) //이렇게하는게 함수형 프로그래밍임

>함수형 프로그래밍 핵심예제

```
  var user =[
    {id:1, name:'ID', age:36},
    {id:2, name:'FD', age:32},
    {id:3, name:'DG', age:27},
    {id:4, name:'EW', age:25},
    {id:5, name:'BF', age:16},
    {id:6, name:'QH', age:26},
    {id:7, name:'HT', age:23}
  ];
```
// 1. 명령형 코드
  //1. 30세 이상인 users를 거른다.
```
  var temp_users =[];
  for(var i=0;i<user.length;i++){
    if(user[i].age >= 30){
      temp_users.push(user[i]);
    }
  }
  console.log(temp_users)
```

// 2. 30TP 이상인 USER의 names를 수집한다.
```
  var names=[];
  for(var i=0;i<user.length;i++){
    if(user[i].age >= 30){
      names.push(user[i].name);
    }
  }
  console.log(names);
```

//3. 30세 미만인 users를 거른다.

```
  var temp_users =[];
  for(var i=0;i<user.length;i++){
    if(user[i].age < 30){
      temp_users.push(user[i]);
    }
  }
  console.log(temp_users)
```
// 4. 30세 미만의 age수집
```
  var temp_users =[];
  for(var i=0;i<user.length;i++){
    if(user[i].age < 30){
      temp_users.push(user[i].age);
    }
  }
  console.log(temp_users)
```


  //2. filter . map으로 리팩토링
```
  function _filter(list,predi){
      var new_list =[];
      for(var i=0;i<list.length;i++){
      if(predi(user[i])){//인자를 주고 그인자를 predi함수 내에서 필터해서 리턴함.
        new_list.push(list[i]);
      }
    }
    return new_list;
    //console.log는 부수효과기 때문에 return으로 소통해야함
    }
  ```

  >함수형 프로그래밍은 추상화의 단위를 *함수를 이용해서* 해야함. 즉 필터를 함수로만들어서 함수에 넣는것임. 필터 -> 추상화 
```
    
  console.log(
      _filter(user, function(user){
        return user.age>=30
      })
    )

  console.log(
      _filter(user, function(user){return user.age <30})//이 조건이   _filter의 함수의 조건으로 들어가게됨.
    )
      console.log(_filter([1,2,3,4], function(num){return num%2;}))
      console.log(_filter([1,2,3,4], function(num){return !(num%2);}))
    //user 뿐만아니라 어디서든지 사용할수 있는 필터함수가 완성되었음.
```


```
  function _map(list,mapper){
      var new_list=[];
      for(var i=0;i<list.length;i++){
          new_list.push(mapper(list[i]));
      }
      return new_list;
    }
```
  >함수형 프로그래밍 할때 함수안에서는 어떠한 타입이나 형을 구분해놓지 않는다. 떄문에 재사용성이 극대화된다.
```
  var over_30 =  _filter(user, function(user){return user.age <30});
    console.log(over_30);

  var names = _map(over_30,function(user){
        return user.name;
      })
    console.log(names);

  var under_30 = _filter(user, function(user){return user.age <30});
      console.log(under_30);

  var ages = _map(under_30,(user)=>{
      return user.age;
    })
    console.log(ages);

  let remap = _map([1,2,3,4],(x)=> x*2);
    console.log(remap)
```