# JSstudy note

## 얇은 복사 깊은 복사
```javascript
console.group('shallow copy ex');
console.group('[String,Boolean,Number]');
```
얇은 복사 : Object를 다룰때 독립적인 값으로 메모리 힙에 할당이 아닌 참조되기 때문에, 

깊은 복사를 따로 해줘야한다.

String, Boolean, Number 데이터는 순수한 값이기 때문에 저장됨. 

-auto deep copy
```javascript
let original = '원본';
let copy = original;
console.log('copy의 값은?', copy); // 원본
    
copy = '복제품';
console.log('original의 값은?', original); // 원본
console.log('copy의 값은?', copy); // 복제품
console.groupEnd();
```
Object는 조금 다름 JS에서는 문자,불린,넘버,Null 뺴고 모두 Object임 
```javascript
console.group('[Object]');
var t1 = ['원본'];
console.log('t1 0번 인덱스의 값은?', t1[0]); // 원본
var t2 = t1;
console.log('t2 0번 인덱스의 값은?', t2[0]); // 원본
 
// 복사의 값 변경시 원본도 영향을 받음 즉, 참조 하고있음
t2[0] = '복제품';
console.log('t1 0번 인덱스의 값은?', t1[0]); // 복제품
console.log('t2 0번 인덱스의 값은?', t2[0]); // 복제품
console.groupEnd();
console.groupEnd();
```
이를 Object마저 deep copy를 해주기 위해선 몇가지 방법이 있다.
//Array Object내의 slice메서드 를 call 해서 사용
```javascript
console.group('deep copy result');
console.group('[Array]slice,call 활용');
var t3 = Array.prototype.slice.call(t1);
t3[0] = 'SLICE CALL';
console.log('t1의 값: ',t1);
console.log('t3의 값: ',t3);
console.groupEnd();

console.group('[JSON]parse stringify start');
var t4 = JSON.parse(JSON.stringify(t1));
t4[0] = 'JSON!'
console.log('t1의 값: ',t1);
console.log('t4의 값: ',t4)

console.groupEnd();
console.groupEnd();
```

>결과

![4574574](https://user-images.githubusercontent.com/33567964/40586047-a0aabc4c-61f6-11e8-8549-3c99f982567b.png)


## 캡슐화

외부에서 접근할수 없는 변수값, 함수를 실행해야지만 사용 가능함.


```javascript
var Person= function(arg){
  var name = arg? arg:'zzoon';

  return{
    getName : function(){
      return name;
    },
    setName : function(arg){
      name = arg;
    }
  }
}

var me = Person();
console.log(me.getName());

var ArrCreate = function(arg){
  var arr = [1,2,3];

  return {
    getArr : function(){
      return arr;
    }
  }
}
```

함수 내부에서 매개변수가 들어왔을때 내부에서 정의한 var로 값을 넣어준다.


그리고 객체를 리턴값으로 반환하여 함수내부의 변수명을 호출함으로써 
함수를 실행했을때 네임을 가르키게 한다.

외부 접근 불가, 함수를 호출함으로써 name값을 호출

하지만 이렇게되면 Person의 prototype을 이용한 상속 구현이 어렵다.

때문에 아래와 같이 바꿔줄 수 있다.



## 팩토리얼 구현
(!)표시는 팩토리얼 표시이며, 3! 이 되있으면 3*2*1이된다.

아래 재귀는 팩토리얼을 구현한건대 재귀적으로 num으로 들어가면서 스택에 쌓이게 된다. 

그리고 num이 0일때 함수가 1을 리턴하면서 종료되고 

스택에 쌓여있던 100*99*98....*2*1 이 스택 프레임의 가장 위부터 리턴되버리기 때문에 

1*2*3이런식으로 재귀적으로 리턴됨.
```javascript
function fact(num){
  if(num==0) return 1;
  else return num* fact(num-1);
}

console.log(fact(100));
```

## 피보나치 수열

```javascript
var fibo = function(){
  var cache = {'0':0,'1':1};

  var func = function(n){
    if(typeof(cache[n]) === 'number'){
      result = cache[n];
    }else{
      result = cache[n] = func(n-1) + func(n-2);
      console.log(cache[n]);
    }
    return result;
  }
  return func;
}();

console.log('fibo',fibo(10));
```

>구동방식

1.[fibo함수]의 끝에 ()실행을 붙혀주므로써, 바로 실행한다.

2.[fibo함수]가 실행되며 cache변수가 생성되고 해당 변수에 object로 인덱스1까지 2가지 프로퍼티와 값이 들어간다.

3.return func이 실행되며, 이때 [func함수]가 [fibo함수]에 반환값이된다.

4.fibo(10)으로 [fibo함수]를 실행하며 매개변수로 10을 넣는다, 이떄 [fibo함수]에 반환되어있던 [func함수]의 매개변수 "n"으로 10이 들어가게된다.

5.if에서 cache[10]의 타입이 number일때 result값에 cache[10]의 값을 넣을텐대 현재 cache[1]까지 밖에 없으므로 else로 넘어가서 실행되게 된다.

6.else에서 10n의 값이 우선적으로 func(n-1)로 들어가게 되며, 이떄 func함수를 다시 호출하므로써 재귀함수로써 동작하게된다.

7.func(10-1) 즉 func(9)로 진행되어 다시 func함수가 호출되고 call stack에 n=10 이 쌓여있게되고 10,9,8,...,2번까지 내려가게 된다.

8.n이 2일때 else에서 func(2-1) 즉 1의 값이 재귀호출 되었을때, if에서 cache[1]의 값이 있으므로 if안쪽으로 동작하게되고 result의 값에 cache[1]의 값인 1이 들어가게 된다. 그다음 return result로 1이 반환되게된다.

9.현재 call stack안엔 10개의 스택이 쌓여있으며, 이제 두번째 func로 실행이 되게된다.
 두번째 func부터는 오른쪽의 계산이 끝났기 때문에 왼쪽의 cache[n]으로 값이 들어가게 된다.

10.현재 n은 2의 값으로 n의값을 참조하여 n은 두번째 func(2-2)함수로 들어가게 되며, 0으로 다시 재귀함수를 호출하게 된다.

11.[func함수]의 매개변수로 0이들어갔기 때문에, if의 안에서 typeof(cache[0])=='number'가 성립함으로써 result 값에 0이 들어가게 된다.

12.쌓여있던 스택으로 n =3이 실행이되며 마찬가지로 두번째 func(3-2)로 1이들어가게 되며, 왼쪽의 [func함수]내부 else 의 cache[3]으로 func(n-1)+func(n-2)의 값이 들어가게 된다.
 3부터는 if문을 통과하지 않기때문에 바로 계산이 되어, cache[3]값 1이 result에 들어가게된다.

※쌓여있던 call stack으로 stack frame의 가장 위쪽부터 시작되기 때문에 n의값이 2부터 10순으로 동작하게 된다. 

13.마찬가지로 n=4이 실행되며, 두번째 func(4-2)로 실행이 된다.





14.두번째 func의 재귀가 모두 끝나면 이제 쌓여있던 콜스택들 첫번째 func와 두번째 func을 더하는 작업을하게되고 else안의 cache[n]로 넣게된다. 10까지 반복하게된다.



>계산의 순서 