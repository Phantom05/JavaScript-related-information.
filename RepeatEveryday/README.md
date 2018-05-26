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
        
```
-이해하고 가기-
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
```
-이해하고 가기-
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
```
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
```
  스코프가 잡혀있으면 메모리 누출이 일어나게됨. 
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
```
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




### 3. PHP