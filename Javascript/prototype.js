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


    //공유와 상속의 구분
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




    //
    prototype layout

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