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
```js
//또한 반복문을 사용할때 특정 조건을 부합하면 바로 break를 해주거나 countinue를 이용해서 즉시 루프를 컨트롤 해줘야

for(var i =0; i<10;i++){
  if(i==5){
    console.log('Hello');
    break;
  }
}
//이렇게되면 추가적으로 더 돌지않고 종료되기 때문에 헛도는걸 방지할 수 있다.
    for (var i = 0; i < 100; i++) {
      if (i == 5) {
        console.log('Hello');
        continue;
      }
      if (i == 50) {
        console.log('7');
        break;
      }
    }
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
>짤막팁
```
class는 className으로 접근하는것이 좋음

Symbol 사용해보기, `백틱 ${사용해보기}` 

배열이나 객체에서 마지막 인자에 , 콤마 사용해도 된다.

toString 사용시 객체는 [object object]아무 짝에 쓸모없는걸로 나옴

함수 내부에서 변환되는 값을 함수가 사라지면서 사라지게되고,

객체를 얕은복사로 변수에 넣고 변수 를 객체와 불린값으로 가르키면 false가 나온다
```
```js
let o = {a:1}
let p = o;
o.a =2;
console.log(p);
// {a:2}
p === o //true
o = {a:2};
p===o //false
console.log(p);
// {a:1}
//새롭게 o에다가 객체를 넣어주므로 참조하는곳이 다르게되어 false가 나온다.
 

let q = {a:1};
console.log(q==={a:1});
//객체를 가리키는 변수는 그 객체를 가르키고 있을 뿐 객체 자체는 아닙니다.
//따라서 변수와 객체는 결코 일치하지 않습니다.

//참조 전달을 하므로 함수안에서 객체를 변경하게되면 함수 외부에서도 바뀐다.

function change_o(o){
  o.a =999;
}

let o ={a:1};
change_o(o);
console.log(o);
// {a:999}
```

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
10.팝업창.ajax통신,예외처리 JSON

10.캡슐화와 프로토타입 상속구현

```js
    function Rectangle(w,h){
      var width = w;
      var height=h;

      //메서드를 선언합니다.
      this.getWidth = function(){return width;};
      this.getHeight = function(){return height;};
      this.setWidth = function(w){
        if(w<0){
          throw '길이는 음수일 수 없습니다.';
        } else{
          width = w;
        }
      };

      this.setHeight = function(h){
        if(h<0){
          throw '길이는 음수일 수 없습니다.'
        }else{
          height = h;
        }
      };
    }

    Rectangle.prototype.getArea = function(){
      return this.getWidth() * this.getHeight();
    };

    var rectangle = new Rectangle(5,7);
    rectangle.setWidth(2);


    console.log('AREA: '+rectangle.getArea());

    function Square(length){
      this.base = Rectangle;
      this.base(length,length);
    }

    Square.prototype = Rectangle.prototype;
    Square.prototype.constructor = Square;
    //이렇게 되면 prototype선언으로 Rectangle이 컨스트럭트였는데
    //자기 자신으로 되면서 완벽하게 Square의 인스턴트가 된다 하지만 Rectangle을 기반으로 프로퍼티와 값들이 들어가있다.

    let abc = new Square(5);
    console.dir(abc)
    alert(abc instanceof Rectangle)
    //하지만 인스턴스는 Rectangle을 가르킨다.
    //Squre의 인스턴스이지만 생성 당시 Rectangle로부터 만들어진 객체라고 인정하는 것이다.
    //즉 생성자 함수 Square가 Rectangle을 상속 받았으므로 가능한 일이다.
```

##게터 세터
```js
    class Rectangle {
      constructor(width, height) {
        this._width = width;
        this._height = height;
      }

      get width() {
        return this._width;
      }
      //rectangle.width 와같이 호출했을때 get을 가져옴
      
      set width(input) {
        this._height = input;
      }
      //바로 .width=200 같이 값을 넣는 행위를 했을때 set이 호출됨

      get height() {
        return this._height;
      }

      set height(input) {
        this._width = input;
      }

      getArea() {
        return this._width * this._height;
      }
    }

    const rectangle = new Rectangle(100, 200);
    rectangle.width = 200;
    console.log(rectangle.width);
    console.log(rectangle.getArea());

//
    const rectangle = new Rectangle(100, 200);
    console.log(rectangle.getArea());

    class Square extends Rectangle{
      constructor(length,height){
        //부모의 생성자(construct를 호출);
        super(length,height);
        //super가 없으면 이 Square로 바인딩 되지 않을 뿐더러 오류를 뿜음.
        console.log(this.constructor);
        //class 확장은 생성과 동시에 constructor를 확장자 클래스가 됨. 
      }
    }

    let ggg = new Square(100);
    console.dir(ggg);
```

```js
let number =273;
    number.print = function(){
      console.log(this)
    }
    number.print();
    //기본 자료형에는 메서드를 추가해도 추가되지 않음
```
### 3. PHP