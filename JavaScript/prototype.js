/*

//prototype은 construct(생성자)를 가진 자만이 자격을 부여할 수 있다 즉 인스턴트 new를 생성할 수 있어야 가능한것이다 그것은 곧 함수이다.

//prototype을 생성하기 위해선 __proto__가 무조건 있어야 한다 이것은 prototype link이며 모든 object에 들어있다.


때문에 
    var foo ={};

    function goo(){
    }

    console.dir(foo);
    console.dir(goo)

콘솔 다이렉트를 찍어봤을떄  foo같은경우 __proto__하나로 끝나게 되지만 goo를 찍어봤을떈 prototype:{constructor:f}가 같이 생성되어 있는걸 볼수가 있다 이는, 함수를 생성할떄 construct(생성자) 자격이 주어지게 되고 prototype object가 cloning 되어 생성되기 때문이다 이로써 prototype을 사용할 수 있게되고 proto link방식으로 참조할수 있는 원형이 되는 것이다. 즉, new 생성자를 사용하여 인스턴스 객체를 만들수 있고 그 객체로 함수 원형의 prototype object에 생성된 prototype에 접근하여 메모리를 참조 할 수 있는것이다.

위 내용에서 주의깊게 봐야할 것이 있다. 바로 __proto__과 constructor 이다. __proto__ 바로 이 녀석이 A라는 객체를 만들어내기 위해 사용된 객체원형에 대한 숨겨진 연결이다. 해당객체의 프로토타입은 A라는 함수객체이며 이 객체의 생성자 역시 function A() 함수라는 것이다. 즉 new Operator를 통해 만들어진 객체는 function A() 를 자신의 프로토타입으로 사용하여 만들어졌다는 말이다.


// 
기초가 부족할때 오류를 자주 범하는 이러한 구문이있다.
function foo(x) {
    this.x = x;
};

var A = new foo('hello'); 
console.log(A.x);
> hello

console.log(A.prototype.x)
> syntax error

엇! 소리가 나올 듯하다. 하지만 이것은 당연한 결과이다. **prototype 프로퍼티는 Constructor가 가지는 프로퍼티** 이다. 그리고 *함수객체만 이 프로퍼티를 가지고 있다고 했다. * A객체는 함수객체가 아니다. foo 라는 원형을 이용하여 함수객체를 통해 만들어진 Object 객체에 확장된 단일 객체일 뿐이다. 즉 A는 prototype 프로퍼티를 소유하고 있지 않기에 A.prototype.x가 syntax error 인 것이다. 즉 프로토타입을 이해하려면 foo.prototype.x 는 OK, A.prototype.x 는 error 라는 사실을 반드시 이해하고 기억하고 있어야 한다.


//
프로토 타입을 수정할떄 함수에 직접 들어가서 수정하는것 또한 되지 않는다, prototype object에 서 링킹되는 방법으로 참조되기 때문에 원형의 함수에서 아무리 수정하려고 노력해봤자 수정되지 않는다.

 let game = function(){

    }
    game.x =function(){
      console.log('world');
    }
    console.log(game)
    //#예제 1.
    var A = function () {
      this.x = function () {
        console.log('hello');
      };
    };

    A.x = function () {
      console.log('world');
    };


    var B = new A();
    var C = new A();
    B.x(); 
    // hello
    C.x(); 
    // hello

    //#예제 2.
    var A = function () {};
    A.x = function () {
      console.log('hello');
    };
    A.prototype.x = function () {
      console.log('world');
    };
    var B = new A();
    var C = new A();
    B.x(); 
    // world
    C.x(); 
    // world

   예제1, 예제2 에서 B,C 를 생성하기 위한 객체 원형 프로토타입은 A 이다. 하지만 여기서 반드시 집고 넘어가야하는 사실은 B,C는 A 를 프로토타입으로 사용하기위해서 A의 prototype Object를 사용한다는 것이다. 그리고 이 Prototype Object는 A 가 생성될 당시의 정보만을 가지기 때문에 예제1에서 A의 Prototype Object가 알고 있는 x 는 function () {console.log('hello');} 가 된다. 즉 A.x 를 아무리 수정하여도 A의 Prototype Object는 변경되지 않기 때문에 A 를 프로토타입으로 생성되는 B,C는 function () {console.lo ('hello');} 만 참조하는 것이다.

  예제2 에서의 결과가 world 가 되는 이유도 같은 이유다. A.prototype 은 A의    Prototype Object를 참조하는 녀석이기 때문에 A.prototype.x 를 정의한다는   것은   A의 PrototypeObject를 직접 이용하게 되는 것이고 그에 따라서 A의   Prototype  Object를 프로토타입으로 이용하여 만들어지는 B,C 가 알고 있는 x 는  function ()  {console.log('world');} 가되는 것이다.


  //
  자바스크립트의 프로토타입 체인(Prototype Chain)

    객체의 생성 과정에서 모태가 되는 프로토타입과의 연결고리가 이어져 상속관계를 통하여 상위 프로토타입으로 연속해서 이어지는 관계를 프로토타입 체인이라고 한다.이 연결은 __proto__ 를 따라 올라가게 된다.

    즉 프로토타입 체인이란 위에서 봤던 프로토타입을 상속해서 만들어지는 객체들관의 연관관계를 의미한다.그림에서 __proto__ 프로퍼티들간 이어진 점선을 타고 가다보면 최종적으로 Object 객체의 prototype Object에 다다르는 것을 알수 있다
      .그렇기 때문에 자바스크립트의 모든 객체는 Object 객체에서부터 파생되어 나온 자식들이라고 하는 것이다.

    이러한 프로토타입 체인은 하위 객체에서 상위객체의 프로퍼티와 메소드를 상속받는다.그리고 동일한 이름의 프로퍼티와 메소드를 재정의 하지 않는 이상 상위에서 정의한 내용을 그대로 물려받는다.하지만 여기에는 엄청난 꼼수가 숨어있다
      .사실 꼼수라는 표현이 좀 애매하긴 하지만 위 그림을 잘 보면 B와 C 는 A prototype Object를 프로토타입으로 만들어졌음에도 불구하고 X 라는 프로퍼티가 존재하지 않는다.사실 "물려 받는다"
    라는 말 자체가 꼼수인 것이다.즉 ** 하위 객체는 상위 객체의 속성과 메소드를 상속 받는 것이 아니라 그것을 공유 ** 하고 있는 것이다.


    #1예제
    var A = function () {};
    A.prototype.x = function () {
      console.log('hello');
    };
    var B = new A();
    var C = new A();

    B.x(); 
    // hello

    C.x(); 
    // hello

    A.prototype.x = function () {
      console.log('world');
    };

    B.x(); 
    // world

    C.x(); 
    // world

    위 예제에서 A의 Prototype Object의 x 메소드를 재정의 하였을 때 B, C객체도 그 영향을 받는다는 것을 알 수 있다.그 이유는 프로토타입 체인에 의한 공유 때문이다.아래의 그림을 잘 봐보기 바란다.


    // 공유와 상속의 구분
 하지만 A 객체가 생성당시 x 라는 메소드 혹은 의미있는 프로퍼티에 대한 정의가 포함된 내용을 가지고 있다면 이들은 공유가 아닌 상속된다.

    var A = function () {};
    var B = new A();
    A.prototype.x = 'hello';
    console.log(B);

    //1개뿐
    >>
    __proto__: Object

    var A = function () {
      this.x = 'hello';
    };
    var B = new A();
    console.log(B);

    //2개
    x: 'hello' >>
      __proto__Object
    //this.x 가 상속된것이다. 공유된것이 아니라, 상속이 된다면 인스턴트로 다시할당이되기때문에 재생성되는것이다.

    이처럼 공유와 상속의 구분을 정확히 이해하고 사용하는 것은 매우 중요하다. 이들을 햇갈리게 되면 후에 프로토타입 재정의에 따른 원하지 않는 참혹한 결과를 가져다 줄수도 있기 때문이다.


    #예제2

    var A = function () {
      this.x = 'hello';
    };
    ↓↓↓↓
    var B = new A();
    console.log(B);
    ↓↓↓↓
    var A = function () {
    };

    // >> A {x: "hello"}

    var A= function() {};
     var B = new A();
     A.prototype.x='hello';
     ↓↓↓↓
     console.log(B);
     ↓↓↓↓
     A.prototype.x='Bye';

     // >>A {}
    //__proto__:x:"Bye"

    보는거와 같이 위에는 그대로 할당이 되어 변경되어도 콘솔에서 hello를 유지하는 반면 아래는 변경되는 동시에 위에서 참조된 x:hello가 x:bye로 변경된것을 확인할 수 있다.

    하지만 후에 프로토타입이 변경된다고 해도 호이스팅이 되지 않기 때문에 


  // * prototype patten *
  
  //
  상속 

  //메모리 할당// 그냥 F.prototype.test=function(){}이런식으로 직접적으로 정의하게되면 힙 메모리 어딘가에 함수가 할당되고 test프로토타입에는 그 참조가 들어가게 된다. 결국 prototype에 직접 정의하는게 아니고 모두 참조하는 방식으로 사용된다 , 링킹

  //기존에 있던 person 객체를 참조하여 create_object함수의 매개변수로  넣어 function F의 prototype으로 넣고 new F() 인스턴트로 생성하게 되면, F.prototype을 정의하긴 하지만 기존의 person을 "참조"하게 되기 때문에 원형의 person을 수정하게 되면 모두 변경된다. 

  // 쉽게말하자면 모두 링킹 되기때문에 원형을 수정하면 모두 수정이된다. 또한, 인스턴스에서 따로 수정한 사항은 원형에 영향을 끼치지 않는다.

    var person = {
      name: 'zzoon',
      getName: function () {
        return this.name;
      },
      setName: function (arg) {
        this.name = arg;
      }
    }

    function create_object(o) {
      function F() {}
      F.prototype = o;
      return new F();
    }

    // create_object함수의 매게변수로 호출될때마다 function F()의 prototype은 교체되어 새로 정의되고 person이 상속되어
    // 인스턴트마다 매게변수로 들어온 object로 상속된다.
    // 떄문에 해당 인스턴트안에서 수정을 해도 링킹된게 아니라 상속된거 이므로, 원형의 F함수 prototype에는 영향을 받지 않는다. 

    var testA = create_object(person);
    var testB = create_object(person);
    var testC = create_object(person);
    var student = create_object(person);
    var gamer = create_object(person);

    console.log('name of testA : ', testA.name);
    // >> zzoon

    person.name='hi';
    console.log('name of testC : ',testC.name);
    // >> hi
    //그럼 이럴땐 어떻게 될까?
    //그냥 함수 F의 인스턴트이기 때문에 모두 프로토타입 person을 가르키면서 생성된것이다. 즉, 함수 F안의 prototype에 연결된 prototype object에 __proto__ 되있지만, person을 참조하고 있기 때문에, person이 수정되면 모두 바뀜. 인스턴스안에 참조된 내용을 바꿔도 인스턴스안에서 바뀌어 사용될 순 있지만, 원형의 prototype object엔 영향이 가지 않는다. 하지만 참조된 원형의 객체를 수정할 경우 인스턴트에서 prototype을 따로 정의하지 않는이상 변화하게 된다.
    다시 console.log('!!!',person) 이렇게 출력 해보면 person의 이름이 name으로 바껴있는걸 확인할수 있다.

    testB.name = 'gang';
    console.log('name of testB : ', testB.name);
    // >> gane

    student.setName('me');
    console.log('name of student : ', student.getName());
    // >> me

    gamer.name = 'junyeong';
    console.log('name of gamer : ', gamer.name);
    // >> junyeong

    Object.getPrototypeOf(student).name = 'everything is changed';
    // F는 create_object를 호출할 때 마다 새로 생기는 함수지만, F.prototype은 외부에 있던 person 객체를 참조하기에 student의 프로포타입 체인 제일 아래에 있는 객체인 F.prototype을 수정하면 곧 person 객체를 수정한 것이나 마찬가지가 된다.



    // * Tip! console.log 는 비동기이다! *

    var A = function() {};
    var B = new A();
     A.prototype.x='hello';
     console.log(B.x); 
     console.log(B); 
     //  B.x >> hello
     //  B >> x:bye
     A.prototype.x='Bye';
    //원래라면 위의 상태에서 당연히 hello가 찍혀야 맞겠지만 콘솔로그가 비동기통신이기 떄문에 아래서 bye로 바꼇을 경우에 콘솔로 보면 다돌아간 출력이 되도 bye로 바껴서 보여지게된다.


    //메모리를 사용하게되면 
    메모리 할당(allocate): 프로그램이 사용할 수 있도록 운영체제가 메모리를 한다.저수준 언어(예를 들어 C) 에서는 이를 개발자가 명시적으로 처리해줘야 한다.그러나 고수준 언어에서는 개발자가 신경쓸 필요 없다

    메모리 사용(use): 이제 할당된 메모리를 실제로 프로그램이 사용하는 단계이다.개발자가 코드 상에서 할당된 변수를 사용함으로써 읽기와 쓰기 작업이 이루어진다.

    메모리 해제(release): 프로그램에서 필요하지 않은 메모리 전체를 되돌려주어 다시 사용가능하게 만드는 단계이다.메모리 할당 작업과 마찬가지로 저수준 언어에서는 이를 명시적으로 처리해야 한다.


    //prototype을 사용할때 중요한 개념
    // * 자바스크립트 엔진 *
    //
    V8엔진은 크게 두 부분으로 구성된다.

    메모리힙(Memory Heap): 메모리할당이 이루어지는 곳이다
    콜스택(Call Stack): 코드가 실행되면서 스택 프레임이 쌓이는 곳이다


    자바스크립트의 엔진이 중요하긴 하지만 엔진만으로 모든 것이 이루어지는 것은 아니다.브라우저가 제공하는 웹 API라는 것도 있어서 DOM, AJAX, setTimeout등이 여기에 포함된다.

    또한 저 유명한 이벤트루프와 콜백큐도 자기 역할을 하고 있다.


    자바스크립트는 싱글 쓰레드(single - threaded) 프로그래밍 언어이다.다시 말하면 콜스택이 하나라는 뜻이다.따라서 한 번에 하나의 일만 할 수 있다.

    콜스택은 기본적으로 우리가 프로그램의 어디에 있는지를 기록하는 자료 구조이다.우리가 함수 안으로 들어가는 순간 해당 함수를 이 스택의 제일 위에 놓게된다.이 함수에서 돌아오면 스택의 가장 윗 부분의 것이 제거된다
    
    .스택이 할 수 있는 일은 이것 뿐이다.

    function multiply(x, y) {
      return x * y;
    }

    function printSquare(x) {
      var s = multiply(x, x);
      console.log(s);
    }
    printSquare(5);

    엔진이 이 코드의 수행을 시작할 때 콜 스택은 비어있는 상태이다.이후의 단계는 이렇게 된다.

    step1
    step1printSquare(5)

    step2
    multiply(x, y)
    printSquare(5)

    step3
    console.log(s)
    printSquare(5)

    step4
    printSquare(5)

    step5


    콜스택의 각각은 스택프레임(Stack Frame) 이라고 부른다.

    또한 이것이 예외가 발생했을 때 스택트레이스가 만들어지는 방식이다.스택 트레이스란 기본적으로 예외가 발생했을 때 콜스택의 상태이다.

    스택 날림(Blowing the stack): 이는 콜 스택의 최대 크기에 다다랐을 때 나타난다. 사실 이런 현상은 특히 재귀 함수를 면밀히 테스트하지 않은 경우 종종 일어날 수 있다

    재귀함수를 사용할땐 조심해야한다.
    자바스크립트 엔진이 이 코드를 실행할 때는 먼저 foo 함수를 호출하는 것부터 시작한다. 하지만 이 함수는 재귀적이어서 별 다른 종료 조건 없이 자기 자신을 계속해서 호출한다. 따라서 이러한 실행의 모든 단계에서 동일한 함수가 콜 스택에 반복해서 추가된다

    하지만 어느 순간이 되면 콜 스택의 수가 실재 콜 스택의 크기를 넘게 되고 브라우저는 무언가 조취를 취해야겠다고 결정하게 된다.그러면 브라우저가 에러를 던지는데 바로 아래와 같은 모습이다.

    오버플로 스택을 넘는순간 뻗어버린다.

    하지만 단일 쓰레드는 제한점도 많다. 자바스크립트는 콜스택이 하나이다. 그러면 특정 코드 실행이 늦어지면 어떤 일이 벌어질까 ?

    //
    동시성과 이벤트 루프
    만약 콜스택 내에 수행시간이 긴 함수가 있으면 어떤 일이 벌어질까 ? 예를 들어 브라우저의 자바스크립트로 복잡한 이미지를 변형을 해야 한다고 생각해보자.

    그럼 스택이 막히기떄문에 오버플로우 뻗어 버릴수가 있다.
    때문에 재귀로 이루어지는 이벤트 루프와 동시성들은 비동기 통신을 하고 setTimeout 같은 함수는 DOM API에서 동작한다.




    --prototype layout--

    HTMLDivElement.prototype
             |
             |.__proto__
             |
    HTMLElement.prototype
             |
             |.__proto__
             |
      Element.prototype
             |
             |.__proto__
             |
       Node.prototype
             |
             |.__proto__
             |
      Object.prototype
             |
             |.__proto__
             |
           null

*/