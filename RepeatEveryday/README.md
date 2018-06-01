REPEAT EVERY DAY STUDY
======================
## STUDY LIST

### 1. JAVASCRIPT ASSO STUDY

- String관련
  - String
  - charAt
  - charCodeAt
  - concat
  - indexOf,가운데 인덱스 뽑아보기
  - lastIndexOf
  - ''.localeCompare('')
  - replace
  - slice
  - split
  - substr
  - substring
  - toLowerCase
  - toUpperCase
  - includes
  - repeat
  - startsWith
  - trim
  - trimEnd
  - trimStart
  - valueOf


- Array 관련
  - Array
  - concat
  - join
  - pop
  - push
  - shift
  - unshift
  - slice
  - sort //함수만들어서 정렬
  - reverse
  - splice ->원본이 수정됨 바꿔보기
  - toString
  - valueOf
  - length
  - forEach
  - map //return
  - filter //조건자 함수
  - every
  - some
  - reduce사용(Left가   - 디폴트);
  - reduceRight
  - includes
  - indexOf
  - lastIndexOf
  - toLocaleString()
  - copyWithin
  - find
  - findIndex
  - keys
  - values
  - entries

>-reduce <br>
재귀적임 [1,2].reduce((z, x)=> z+x, 1); 인자가 없을떈 배열의 가장 앞에값을 뽑아서 z로 삼음

> map과 filter의 차이점 걸러주는것과 만들어주는것<br>
조건을 걸 경우 map은 false false true true로 만들어주고 filter는 3.54를 배열로 걸러줌
둘다 리턴값을 밷는데 forEach는 리턴값을 뱉지않음 
그리고 map과 filter 모두 배열로 빼줌

```
-이해하고 가기-
let ab =[1,2,3,54]

let gemi = ab.map(x =>x>2);
console.log(gemi);

let amy = ab.filter(x=> x>2);
console.log(amy)

let gay = ab.forEach(x=>console.log(x));
console.log(gay);
```


- Object 관련
  - prototype
  - setPrototypeOf
  - assign
  - create
  - entries
  - freeze
  - seal
  - keys
  - is
  - isSealed
  - isFrozen
  - values

```
  const object2 = { 0: 'a', 1: 'b', 2: 'c' };
  console.log(Object.entries(object2)[2]);
  // expected output: Array ["2", "c"]
```


- Math 관련
  - Math.abs
  - Math.ceil
  - Math.floor
  - Math.max
  - Math.min
  - Math.pow
  - Math.random
  - Math.round
  - Math.sqrt

- Number 관련
  - toFixed
  - toPrecision
  - toString
  - valufOf
  - isInteger
  - isFinite
  - MAX_SAFE_INTEGER
  - isSafeInteger

- Date() 관련
  - new Date() //년도 바꿔보기
  - getDate()
  - getDay()
  - getFullyear() //getYear ->사용안함
  - getHours()
  - getMilliseconds()
  - getMunutes()
  - getMonth() 0~11 0부터시작
  - getSeconds()
  - setDate()
  - setDay()
  - setFullyear() //getYear ->사용안함
  - setHours()
  - setMilliseconds()
  - setMunutes()
  - setMonth() 0~11 0부터시작
  - setSeconds()
  - toDateString()
  - toTiemString()
  - toLocaleDateString()//운영체제에 설정된 문화권에 맞는 형태
  - toLocaleTimeString()
  - toLocaleString()
  - toString()
  - toTimeString()

- Boolean 관련
  - toString()
  - valueOf()

- Global 관련
  - escape
  - isFinite()
  - isNaN()
  - Number()
  - parseFloat()
  - parseint()
  - String
  - unescape
  - hasOwnProperty('')
  - typeof

- Function
  - length
  - name
  - call// 기본 메소드호출 써보고, 함수 2개이상 만들어서 Product, food 만들어서 해보기
  - apply
  - bind
  - for
  - do while
  - while
  - for of
  - for in
  - arrow function // 한줄일때만 중괄호 생략 가능, 매개변수가 없을떈 (()=>console.log('Hello'))()
  - class{constructor{}}
  - class extends
  - instanceof 
  - arguments // 배열처럼 사용해보기 hint:slice
  - closure // 파라미터 사용 저근
  - new 생성자 / instance객체 // 생성자함수 생성시 원형 함수명 첫글자 대문자

>-bind<br>
 target.addEventListener('click',tarfuntion.bind(target1[0]))
        //이렇게하면 this가 target1[0]로 바껴져있는 상태임
        //디스를 내가 원하는 객체로 명시적으로 지정한다고 생각하셔도 됩니다.
        //call이나 apply는 바로 실행이 되는 반면에 bind는 대기상태로 남아있음.
        
```javascript
//이해하고 가기-
function HelloFunc(func) {
    this.greeting = 'hello';
  }

HelloFunc.prototype.call = function(func) {
    func ? func(this.greeting) : this.func(this.greeting);
  }

var userFunc = function(greeting) {
    console.log(greeting);
  }

        var objHello = new HelloFunc();
        objHello.func = userFunc;
        objHello.call();
```
```hint매개변수로 그냥 호출됬을때 값이 있으면 true인거 뿐만 아니라 var str = 'ssss';
(str && str.length) 이렇게 있을떄도 str은 트루값
||일떄 앞에게 true이면 뒤로안감 & & &있을떄 모두 트루면 맨뒤에값만 인식함
//변수에 담기면 참조값을 가져오기떄문에 객체 내 메소드를 변수에 담을시 this는 window가됨
```


<br>

>Cloure
```javascript
//이해하고 가기-
var getCompletedStr = (function() {
            var buffAr = [
                'I am ',
                '',
                '. I live in ',
                '',
                '. I\'am ',
                '',
                ' years old',
            ];

            return (function(name, city, age) {
                buffAr[1] = name;
                buffAr[3] = city;
                buffAr[5] = age;

                return buffAr.join('');
            })
        })()

        var str = getCompletedStr('zzoon', 'seoul', 16);
        console.log(str);
```
```
// 동일 레벨에 스코프떄문에 반환되도 buffAr의 값을 가져올수 있음. 클로저 리턴되면서 원래 익명함수는 죽고 내부함수가 자리하게되는데 스코프덕분에 가져올수있음.
```

<br>

>setTimeout && obj[객체 키] = 객체 값 생각하기
```javascript
function callLater(obj,a,b){
            return (function(){
                obj['sum'] = a+b;
                console.log(obj['sum']);
            })
        }
        
        var sumObj ={
            sum:0
        }
        
        var func = callLater(sumObj,1,2);
        setTimeout(func,1000)
        // 인자를 받은만큼 늦게출력
```
- JSON
  - parse
  - sytingify

- Ajax
  - GET
  - POST
- jQuery Ajax


- Element
- Properties
  - attrubytes
  - childElementCount
  - children /[]
  - firstElementChild
  - lastElementChild
  - classList (add,remove,toggle,contains,replace)
  - className
  - clientHeight
  - clientWidth
  - clientLeft
  - clientTop
  - id
  - innerHTML /다 제거하고 새로넣음
  - innerText
  - outerText
  - textContent
  - outerHTML
  - outerText
  - name
  - previousSibling
  - nextSibling
  - nextElementSibling
  - previousElementSibling
  - prepend
  - append
  - before
  - after
  - before
  - remove
  - appendChild
  - firstChild
  - lastChild
  - removeChild
  - parentNod
  - nodeName
  - nodeType
  - nodeValue
  - cloneNode
  - hasChildNodes


- Methods
  - replaceWith
  - getElementById
  - getElementByClassName
  - getElementsByTagName
  - querySelector()
  - querySelectorAll()
  - getAttribute('')
  - getAttributeNames
  - getAttributeNode
  - hasAttribute('')
  - hasAttributes
  - createElement
  - removeAttribute()
  - removeAttributeNode
  - setAttributeNode()
  - setAttribute
  - insertBefore
  - insertAdjacentHTML('position',Element)
  - -beforebegin,afterbegin,beforeend,afterend
  - (Ele앞,Ele안first,Ele안last,Ele뒤)
  - insertAdjacentElement
  - insertAdjacentTEXT
  - matches('Selector')
  - contain
  - text
  - value

- DOM API
  - setInterval
  - setTimeout
  - clearInterval

- Event
  - addEventListener
  - removeEventListener
  - target // e.target하고 스타일 주면 하위 메뉴에 타케팅 가능 //이벤트 버블링땜에
  - e.currentTarget - 이벤트 건 태그에 타게팅
  - focus()
  - blur
  - click
  - dblclick
  - focusin
  - keydown // e.key
  - keypress
  - keyup
  - event.keycode
  - load //window
  - unload
  - mousedown
  - mouseup
  - mouseover
  - mouseout
  - mouseenter
  - mouseleave
  - scroll
  - wheel
  - select
  - change
  - 클릭 막기 // e.preventDefault, return false


- window
  - reload
  - open
  - prompt
  - innerWudth
  - location
  - alert
  - play
  - DOMContentLoaded
  - loaded
  - try,catch,finally

- console
  - console.log
  - console.dir
  - console.error
  - console.group
  - console.trace
  - console.warn
  - clear()


- 메모리누출
  - target =null
```javascript
  //스코프가 잡혀있으면 메모리 누출이 일어나게됨. 
    function addHandlerr() {
      let target = document.getElementById('target');
      target.addEventListener('click',function(){
        this.style.background='blue';
      })
      // target.onclick = function () {
      //   this.style.background = 'orange';
      // }
      target = null; 
      //때문에 이렇게 함수 안에서 밖의 변수를 참조했을때 계속 스코프가 잡혀있는데 이걸 null로 순환을 끊어줘야함
    }
    addHandlerr()
```


> 변수 안에 함수를 넣었을경우 구동방식 이해
```javascript
function makeAdder(a) {
      console.log("parent'a'", a)
      return function (b) {
        console.log('b', b)
        console.log("son 'a'", a)
        return a + b;
        
      }
      console.log('aaa',a)
    }

    x = makeAdder(5); // 펑션b가 리턴되있는상태
    //a에 5가들어감
    //a에 5가 셋팅된 function (b)라고하는 상태
    console.log(x(6)); // 함수(b)를 실행하는 것임.
```


### 2. TEST FOR JAVASCRIPT

1. jQuery로 페이지 인클루드
```javascript
      //페이지가 로드되면 실행한다.
      $(document).ready( function() {
         $("#header").load("./include/header.html");
         $("#footer").load("./include/footer.html");
         //~이렇게 한줄만 해주면 알아서 contents에 testContents.html파일을 넣어 준다.
      });
```

2. 식별 팁
```javascript
Element.tagName = "";
Element.id = "";
Element.className="";  // += 로 추가해야함 그냥쓰면 교체
Elemnet.classList=""; // 배열형식으로 [i]로 조회가능 여러개일떄
```

class는 className으로 접근하는것이 좋음

3. 앞뒤로 넣기 세부조정
```javascript
.innerText,outerText  = //HTML과는 다르게 
.insertAdjacentHTML('','')//앞에 속성이 들어간다.
-beforebegin : //타켓의 바로 앞에서 시작
-afterbegin :// 타겟 바로 뒤에 시작
-beforeend : //타겟끝나기 바로앞에 시작
-afterend  :// 타겟 끝나고 바로뒤에 시작
```

4. ()()사용하는 이유 -> 함수를 변수에 넣고 그변수를다시 ()하면 내부함수까지 실행됨
스코프체인, 클로저, 반복문
```javascript
    function test(x) {
      const may = 10;
      return function () {
        (may == 10) ? testB(x) : false;
        return function (e) {
          return function (e) {
            for (var i = 0; i < 1; i++) {
              console.log(e + '단 시작합니다.')
              for (var j = 1; j < 10; j++) {
                console.log(e + 'x' + j + '=' + e * j);
              }
              console.log(e + '단 끝났습니다.');
              return testC(e);
            }
          }
        }
      }
    }
    function testB(x) {
      console.log(x * 5);
      return;
    }
    function testC(y) {
      let ga = setInterval(() => {
        y--;
        console.log('카운트다운: ' + y);
        (y == 0) ? clearInterval(ga) : false;
      }, 500);

      setTimeout(() => {
        console.log('게임을 시작하지');
        testD(y);
      }, 6000);
      return;
    }
    function testD(z) {
      let ar = [];
      setTimeout(() => {
        let count = setInterval(() => {
          z++;
          ar.push(z);
          console.log(ar);
          if (z == 100) {
            clearInterval(count)
            testE(ar);
          }
        }, 100);
      }, 500)
    }

    function testE(z) {
      let ar = 100;
      let down = setInterval(() => {
        ar--;
        z.pop(ar);
        console.log(z);
        (ar == 0) ? clearInterval(down) : false;
      }, 100)

    }

    let result = test(4)();
    let second = result(10);
    second(9);
```
5. for in 문
```javascript
var obj = {
	name: "object",
	age: 10,
	weight: 5
}
var sum = 0;
for ( ____ in ____ ){
    if( typeof( ____ ) == "number" ){
        sum = sum + ____;
    }
}
```

6. shadowing 잘출력되게 해봐라
```javascript
function printTimesTable(a){
	for( i = 1 ; i <= 9 ; i++ ){
		console.log( a + " * " + i + " = " + a*i );
	}
}

for( var i = 2 ; i <= 9 ; i++ ){
	printTimesTable(i);
}
```

7. call 사용
```javascript
var numbers = {
            numberA: 5,
            numberB: 10,
            sum: function() {
                console.log(this === numbers); // => true
                function calculate() {
                    console.log(this === numbers); // => true
                    return this.numberA + this.numberB;
                }
                // 문맥을 수정하기 위해 .call() 메소드를 적용
                return calculate.call(this);
            }
        };


> var a = { x: 1 };
> var b = function (y) { console.log(this.x + y); };
> b.call(a, 1);
// 2
> b.apply(a, [1]);
// 2
```

8.유사배열 바꿔서 완성 arguments도 이용해보기
```javascript
function average(array){
  //함수를 완성하세요
}

console.log(average([1,2,3]));
```
9.별찍기
### 3. PHP