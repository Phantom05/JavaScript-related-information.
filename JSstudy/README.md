# JSstudy note

## 얇은 복사 깊은 복사
```
console.group('shallow copy ex');
console.group('[String,Boolean,Number]');
```
얇은 복사 : Object를 다룰때 독립적인 값으로 메모리 힙에 할당이 아닌 참조되기 때문에, 

깊은 복사를 따로 해줘야한다.

String, Boolean, Number 데이터는 순수한 값이기 때문에 저장됨. 

-auto deep copy
```
let original = '원본';
let copy = original;
console.log('copy의 값은?', copy); // 원본
    
copy = '복제품';
console.log('original의 값은?', original); // 원본
console.log('copy의 값은?', copy); // 복제품
console.groupEnd();
```
Object는 조금 다름 JS에서는 문자,불린,넘버,Null 뺴고 모두 Object임 
```
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
```
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