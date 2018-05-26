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

>for문 list추출 코드를 줄이기 위한 함수를 따로 뺴냄
```
   function _each(list,iter){
      for(var i =0;i<list.length;i++){
        iter(list[i])
      }
      return list;
    }
```
//list로 들어온 것들을 차례로 iter함수의 매개변수로 넣는다는 함수임.iter로는 필터링으로 만든함수가 들어감 그래서 필터링으로 걸러진것들을 list에 푸쉬함 


```
function _filter(list,predi){
  var new_list =[];
  _each(list,function(val){
  if(predi(val)) new_list.push(val);
});
return new_list;
}

function _map(list,mapper){
  var new_list=[];
  _each(list,function(val){
      new_list.push(mapper(val));
  });
  return new_list;
}

function _each(list,iter){
  for(var i =0;i<list.length;i++){
    iter(list[i])
  }
  return list;
```

그리고 이렇게 변경됨.

//아래는 우리가 만들었던 위의 함수들의 기본 자바스크립트 메서드들이다.

```
  console.log(
    [1,2,3].map((x)=> x*2)
  )

  console.log(
    [1,2,3,4].filter((x)=> x%2)
  )
```

기본적으로 있는건대 메서드이기 떄문에 메서드는 해당 클래스의 인스턴스에서만 사용할수 있는 특징이있음, 하지만 우리가 저렇게 만들면 Array뿐만 아니라 엘리먼트, 객체 등 다양하게 원하는데로 바꿔서 사용할 수있다.

// 이런경우가 있다 흔히 사용하는 제이쿼리의 $('div')같은 기능의 네이티브인
```
console.log(
  document.querySelectorAll('*')
)
```
//확인시 배열로 확인할 수 있지만 이는 배열이 아니고 Array like이다 때문에 아래와같은 코드가 실행되지 않는다.
```
console.log(
  document.querySelectorAll('*').map((x)=> x.nodeName)
)
```
// 가짜 배열이기 때문에 오류가 나오게 된다.

>하지만 우리가 만들었던 함수를 적용시키면?
```
console.log(
  _map(document.querySelectorAll('*'),function(x){
    return x.nodeName;
  })
)
```
결과는 아주 잘나온다.
>동작 순서

1. [_map함수]셀렉된(documetn.query...) node들을 _map 함수의 첫번째 파라미터(list)로 넣고 두번째 파라미터 (x)=> x.nodeName함수를 mapper인자로 넣는다.

2.[_map함수]의 list파라미터로 들어온 리스트(셀렉된것)들을 다시 [_each함수]의 첫번째 파라미터(list)로 넣는다.

3.[_each함수]에서 차례대로 들어온 리스트(셀렉된것)들을 순차적으로 iter함수의 매개변수로 넣는다(셀렉된것)넣는다

4. [_map]함수로 돌아와 [_each함수]의 2번째 파리미터 즉, iter의 파라미터로 차례로 들어간 리스트들을 두번째 파라미터의 파라미터(val)로 넣는다.

5. 처음에 mapper로 들어간 함수의 파라미터로 리스트(셀렉된 것)들이 들어간다. 처음에 정의한 [(x)=> x.nodeName함수] 즉 처음에 mapper로 들어온 정의한 함수의 파라미터로 차례대로 들어온 쿼리셀렉의 node들 리스트를 넣고 그 쿼리 셀렉의 node들을 차례대로 nodeName을 반환한다.

6. 반환된 값들을 차례대로 new_list에 push한다
7.new_list를 리턴한다.


