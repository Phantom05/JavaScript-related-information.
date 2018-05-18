/*
      //
      ☆ Prototype의 구동 원리 및 중요한 개념 ☆

        console.log('---');
        function testA(){}

        // testA가 생성되면 함수이기때문에 우선적으로 Function prototype으로 __proto__가 되서 Function    기능을 사용할 수 있는것이고, 

        //testA의 prototype이 생성된 다음, 그 prototype으로 constructor가 생성된 후 construct는 자신의    원형 함수를 가르키게 된다. 떄문에 이후 추가되는 인스턴트들을 관리하기 위해서는 testA.prototype.   이런식으로 생성하게 되는것이다. 즉, prototype의 객체로 또하나의 object를 생성하는 꼴이 되는거지..      바로 저 prototype이란 prototype을 통해 생성하는것이다. 

        //생성된 인스턴트들은 __proto__가 constructor가 있는 prototype으로 참조되게 될것이고 거기서   원하는  이름의 object를 찾은 다음 사용하게 되는 것이다. 만약 이 prototype 안에 없을때 이  constructor에서   연결된 __proto__인 원형 함수로 찾아가서 찾는다. 

        // 이렇게 사용되선 안되지만 원형 함수에도 없을시 원형 함수의 __proto__로 연결된 Function    prototype에서 찾을 것이고 그 Function prototype은 최상위 객체인 Object Prototype으로 연결된다.

        // 또한 이 constructor는 최상위인 Built-in object인 Object Prototype과 연결되고 이 최상위     Object의 __proto__는 null 이다 가장 최상위이기 때문에 더 타고 올라갈게 없기 때문이다.
        testA.prototype.SHOWME = 'HELLO PROTO!';
        console.dir(testA)
        // testA안의 prototype 객체 안에 SHOWME라는 객체가 생성되고 값으로 HELLO PROTO가 들어감


      //prototype 속성을 새 객체로 대체하면 기본 constructor 속성이 삭제된다.

        prototype 속성의 기본값은 다른 값으로 대체할 수 있다.
        하지만 prototype 속성을 바꾸면 원래의 prototype 객체에서 볼 수 있었던 기본 constructor 속성도 사라지게 된다.
        다음은 Foo 생성자 함수를 만들고 Foo 의 prototype 속성을 빈 객체로 대체한 후 인스턴스의 constructor 속성이 사라졌는지 확인해 보는 코드이다.
        이제 이 코드에서는 constructor 속성은 Object() 생성자를 참조하게 될 것이다.

        var Foo = function () {}
        Foo.prototype = {}
        var fooInstance = new Foo();
        console.log(fooInstance.constructor == Foo); // false 가 기록된다. // 참조가 망가졌다. 즉, 연결고리가 끊어진 것이다.
        console.log(fooInstance.constructor);
        // Foo 생성자 함수 가 아닌 Object() 가 기록된다.

        var Bar = function Bar() {};
        var barInstance = new Bar();
        console.log(barInstance.constructor == Bar); // true 가 기록된다. console.log(barInstance.constructor); // Bar 생성자 함수가 기록된다.

        만약 자바스크립트가 설정한 기본 prototype 속성을 대체할 생각이라면 즉, 자바스크립트 객체지향 패턴에서 종종 사용되는 방식등을 사용할 경우에는 생성자 함수를 참조하는 constructor 속성을 원래대로 복원해주어야 한다
        다음은 앞의 코드를 조금 수정하여 constructor 속성이 원래의 생성자 함수를 올바르게 참조하도록 해보자.

       // prototype 속성을 새 ★객체로★ 대체하면 이전에 만든 인스턴스는 갱신되지 않는다. 값으로 바꾸면 대체된다.


        var Foo = function Foo() {};
        Foo.prototype = {
          constructor: Foo
        };
        var fooInstance = new Foo();
        console.log(fooInstance.constructor == Foo); // true 가 기록된다. console.log(fooInstance.constructor); // Foo 생성자 함수가 기록된다.

        var Foo = function Foo() {};
        Foo.prototype.x = 10;
        var FooInstance = new Foo();
        console.log(FooInstance.x); // 예상한 대로 10 이 기록된다. 
        // prototype 객체를 새로 만든 Object() 객체로 대체/정의해 보도록 한다. 

        Foo.prototype = {
          x: 20
        };
        console.log(FooInstance.x);
        // 10 이 기록된다. 

         위에서 prototype 을 새로운 객체로 갱신했으니까 20 이 되어야 하지 않을까? 라고 생각할 수 있다. FooInstance 는 여전이 처음 인스턴스로 만들어진 시점의 prototype 객체를 참조하고 있다. 
      
        // Foo() 의 인스턴스를 새로 만들어 본다. 
        var NewFooInstance = new Foo();

        // 새로 만든 인스턴스는 새로운 prototype 객체인 { x : 20 } 와 묶여있게 된다.

        console.log(NewFooInstance.x); 

        // 20 이 기록된다.
        여기서 알 수 있는 사실은 인스턴스를 만든 뒤에는 객체의 prototype 속성을 새 객체로 대체하면 안된다는 것이다.
        만약 새 객체로 대체해버리면 같은 생성자에서 만든 인스턴스라 해도 서로 다른 prototype 객체를 참조하게 될 것이다.

        //
        사용자 정의 생성자도 네이티브 생성자처럼 프로토타입을 상속할 수 있다.

        var Person = function () {}; // 모든 Person 인스턴스는 legs, arms, countLimbs 속성을 상속하도록 정의한다. 
        Person.prototype.legs = 2;
        Person.prototype.arms = 2;
        Person.prototype.countLimbs = function () {
          return this.legs + this.arms;
        };
        var chuck = new Person();
        console.log(chuck.countLimbs()); // 4 가 기록된다.

        위의 코드에서 Person() 생성자 함수를 만든 후 Person() 의 prototype 속성에 몇 개의 속성을 추가하여 모든 인스턴스가 상속받도록 정의했다.
        이 코드는 자바스크립트가 네이티브 객체를 상속할 대 사용했던 것과 똑같은 방법으로 프로토타입 체인을 사용한 것이다.
        전달된 매개변수가 없을 때 프로토타입에서 속성을 상속받은 생성자 함수를 만들어보면 이를 조금 더 잘 이해할 수 있을 것이다.
        다음 코드에서 Person() 생성자는 전달된 매개변수가 있으면 이를 사용해 인스턴스 속성을 추가하지만 전달된 값이 아예 없거나 한 개만 있으면 프로토타입에서 상속받은 값을 사용한다.
        인스턴스 속성이 있으면 상속된 속성이 사용되지 않는다.
        따라서 어느 경우에든 속성을 문제없이 사용할 수 있을 것이다.

        var Person = function (legs, arms) { 
          // 프로토타입에서 상속받은 값을 가린다. 
          if (legs !== undefined) { 
          this.legs = legs; 
        } 
          if (arms !== undefined) { 
          this.arms = arms; 
        } 
        }; 
        Person.prototype.legs = 2; 
        Person.prototype.arms = 2; 
        Person.prototype.countLimbs = function () { 
          return this.legs + this.arms; 
        }; 
        
        var chuck = new Person(4,4); 
        console.log(chuck.countLimbs()); // 8 이 기록된다. 
        // 매개변수를 전달하지 않을 경우 
        var chuck2 = new Person(); 
        console.log(chuck2.countLimbs()); // 4 가 기록된다. 
        // 전달된 매개변수가 없기 때문에 Person 에는 속성을 가지고 있지 않다. 
        // 하지만 프로토타입 체인을 통해 검색한 결과를 통해 4 를 기록하게 되는 것이다.

        //
        상속 체인 만들기
        
        프로토타입 상속은 전통적인 객체 지향 프로그래밍 언어에서 볼 수 있던 상속 패턴을 흉내내기 위해 만들어진 것이다.
        자바스크립트에서 인스턴스란 간단히 말해 다른 객체의 속성에 접근할 수 있는 객체이다.
        이를 위해 먼저 상속받고자 하는 부모 객체의 인스턴스를 만든 후 생성자의 prototype 에 할당하면 부모 객체를 상속받을 수 있다.
        prototype 속성에 부모 객체의 인스턴스를 할당하고 나면 부모 객체 생성자의 prototype 과 상속받는 객체 사이에는 연결고리(__proto) 가 생기게 된다.


        var Person = function () {
          this.bar = 'bar';
        };
        Person.prototype.foo = 'foo';
        var Chef = function () {
          this.goo = 'goo';
        };

        Chef.prototype = new Person(); // Person() 객체의 인스턴스를 할당 

        var cody = new Chef();

        console.log(cody);

        위 코드에서 Chef 객체( = cody) 는 Person 을 상속받는다.
        다시 말해, 어떤 속성을 Chef 객체에서 발견하지 못하면 그 다음에는 Person() 생성자 함수의 prototype 에서 속성을 찾는다는 뜻이다.
        이렇게 상속 관계를 만들기 위해 해야 할 일은 Chef.prototype 의 값으로 Person() 객체의 인스턴스를 할당 해주는 것이 전부이다.
          *
        위 코드에서 한 일은 네이티브 객체에서 원래 사용하고 있던 시스템을 빌려온 것 뿐이다.
        prototype 속성에 있어서 원래 사용하던 Object() 값이나 Person() 값은 다른 점이 없다.
        다시 말해, 객체의 상속된 속성에 접근하면 객체를 만든 생성자 함수의 prototype 속성에서 그 값을 찾을 것이라는 의미이다.
          *



        //prototype은 construct(생성자)를 가진 자만이 자격을 부여할 수 있다 즉 인스턴트 new를 생성할 수   있어야 가능한것이다 그것은 곧 함수이다.
        모든 Function() *인스턴스*에는 prototype 속성이 있다.
        프로토타입 체인의 끝은 Object.prototype 이다. 그 끝에서도 찾지 못할경우 undefined가 출력된다.
        //prototype을 생성하기 위해선 __proto__가 무조건 있어야 한다 이것은 prototype link이며 모든   object에 들어있다.


        때문에 
        var foo ={};

        function goo(){
        }

        console.dir(foo);
        console.dir(goo)

        콘솔 다이렉트를 찍어봤을떄  foo같은경우 __proto__하나로 끝나게 되지만 goo를 찍어봤을떈 prototype:{constructor:f}가 같이 생성되어 있는걸     볼수가 있다 이는, 함수를 생성할떄 construct(생성자) 자격이 주어지게 되고 prototype object가 cloning 되어 생성되기 때문이다 이로써     prototype을 사용할 수 있게되고 proto link방식으로 참조할수 있는 원형이 되는 것이다. 즉, new 생성자를 사용하여 인스턴스 객체를 만들수 있고   그  객체로 함수 원형의 prototype object에 생성된 prototype에 접근하여 메모리를 참조 할 수 있는것이다.

        위 내용에서 주의깊게 봐야할 것이 있다. 바로 __proto__과 constructor 이다. __proto__ 바로 이 녀석이 A라는 객체를 만들어내기 위해 사용된    객체원형에 대한 숨겨진 연결이다. 해당객체의 프로토타입은 A라는 함수객체이며 이 객체의 생성자 역시 function A() 함수라는 것이다. 즉 new    Operator를 통해 만들어진 객체는 function A() 를 자신의 프로토타입으로 사용하여 만들어졌다는 말이다.


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
      
        엇! 소리가 나올 듯하다. 하지만 이것은 당연한 결과이다. **prototype 프로퍼티는 Constructor가 가지는 프로퍼티** 이다. 그리고 *함수객체만 이 프로퍼티를 가지고     있다고 했다. * A객체는 함수객체가 아니다. foo 라는 원형을 이용하여 함수객체를 통해 만들어진 Object 객체에 확장된 단일 객체일 뿐이다. 즉 A는 prototype 프로퍼티를    소유하고 있지 않기에 A.prototype.x가 syntax error 인 것이다. 즉 프로토타입을 이해하려면 foo.prototype.x 는 OK, A.prototype.x 는 error 라는 사실을 반드시    이해하고 기억하고 있어야 한다.


        //
        프로토 타입을 수정할떄 함수에 직접 들어가서 수정하는것 또한 되지 않는다, prototype object에 서 링킹되는 방법으로 참조되기 때문에 원형의 함수에서 아무리     수정하려고 노력해봤자 수정되지 않는다.

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

        *
        * 부모의 객체의 메서드를 그대로 상속받아 사용하는 방법을 살펴 보았다. 인스턴스(자식)의 메서드를 추가하거나 수정했을때 기능을 더 확장 시킬 수 있어야한다. 인스턴스를 수정했을때, 원형에 영향이 가지 않으므로 계속적으로 확장이 가능하다. *
        * 
        * 
        student.setAge = function(age){...}
        student.getAget = functuin(){...}
        이런식으로 확장 시킬 순 있지만 이렇게 구현하면 코드가 지저분해지기 쉽상이다. 보다 갈금한 방법으로 범용적으로 extend()라는 이름의 함수로 객체에 자신이 원하는 함수를 추가할 수 있다.

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


        //
        extends함수 inner 동작

        var person = {
        name: 'zzoon',
        getName: function () {
          return this.name;
        },
        setName: function (arg) {
            this.name = arg;
          }
        };

        function create_object(o) {
        function F() { };
        F.prototype = o;
        return new F();
       }


       function extend(obj, prop) {

        if (!prop) {
        prop = obj;
        obj = this;
        }   //prop이 없을때 실행되지 않음.
      for (var i in prop) {
        console.log(prop[i])
        obj[i] = prop[i];

        //////
        
        야이 븅신아 기억해라 obj[i]면 키값이 i에 들어가기 때문에,
         obj['setAget']= function (age) {
          this.age = age;
        },
        obj['getAge']= function () {
            return this.age;
         }
       };
        요렇게 될 수 있는거다 ; 
        //////
      
      }
        return obj;
      };

      var student = create_object(person);
      var added = {
        setAge: function (age) {
          this.age = age;
        },
        getAge: function () {
          return this.age;
        }
      };

      extend(student, added);
      //student 인스턴트 객체를 확장
      //added 객체를 student 객체로 added를 넣음.

      student.setAge(25);
      console.log(student.getAge());
      console.log(student);
      console.dir(student);

      //
      원래라면 새로운 객체로 대체될때 이전의 인스턴트의 참조값갱신할수 없지만   참조방식일때는 덮어쓰더라도 참조되는 객체바뀌지 않는이상 새로 대체되지 않는다.

      let tager = {
        name: 'phantom'
      }
      let aaa = new create_object(person);
      console.log(aaa);

      person.name = 'aa';
      let bbb = new create_object(tager);

      //때문에 이렇게 봤을때 person.name을 변경했을때 위의 aaa는 변경되지만 새로운  객체로 tager을 넣었을땐 변경되지 않음을 알수있다.


      // **
      //자식 클래스에서 부모 생성자의 인스턴트로 접근하여 prototype 설정

      function Person(arg) {
        this.name = arg;
      }

      Person.prototype.setName = function (value) {
        this.name = value;
      };

      Person.prototype.getName = function () {
        return this.name;
      }

      function Student(arg) {}

      var you = new Person('iamhjoo');
      // you라는 변수에 인스턴스 객체를 생성하여 Person의 내용을 상속함 name : iamhjoo; 라고 넣어둠

      Student.prototype = you;
      // Student.prototype 으로 인스턴스 객체 you를 참조함

      // 이렇게 되면 Stuendt의 prototype으로 you인스턴트 를 참조하지만 링킹은 you 의 __proto__인  Person.prototype을 가르키게됨. 아직은 Person의 원형 함수에 접근할수 없음. 단지 프로토타입만 연결되었을뿐

      // 즉, you 안에있는 Person 생성자의 prototype인 setName과 getName을 사용할 수 있다는 것임.

      var me = new Student('zzoon');
      //'zzoon'을 받은곳이 없어 사라짐.
      // me라는 변수에 Student의 zzoon이 들어간 인스턴트를 생성함
      // 현재 me에는 you가 들어가 있으며 Person 생성자의 prototype인 setName과 seName을 사용할 수 있는 상황.

      console.log('setName 전 ', me);
      // 하지만 지금 상황에서 me를 출력했을 경우 name으로 zzoon이 출력되지 않는다.

      me.setName('zzoon');
      // 이렇게 setName으로 prototype의 부모 생성자를 호출해서 this.name =value로 넣어줬을때 비로소 name에  zzoon이 입력 된다.
      console.log(me.getName());
      console.log('setName 후 ', me);


      // 이를 극복하기위해
      function Student(arg) {
        Person.apply(this, arguments);
        //apply는 배열 을 넘겨주는 것이지만 유사배열도 넘겨줄 수 있음.
        //아래쪽에서 넣어줬지만 함수는 최상위로 호이스팅 되기 때문에 적용이 잘됨
      }

      function abc() {return}
      //parameter를 받는곳이 없을땐, 0x023855 이런 메모리값으로 자동해제됨. 즉 가비지   컬렉터로 들어가게됨. 연결고리가 더이상 없기때문에,
      //콘솔은 비동기기 때문에 지금상황에서 출력이 되지만 사실상 '2'는 메모리어딘가에   버려져있는것임
      abc('2')

      // 하지만 이러한 경우에 자식클래스가 부모 클래스의 인스턴트를 참조하여 prototype을 연결하고 있기때문에  자식클래스에 prototype을 추가할때 문제가 된다. 이럴경우 두 클래스 사이에 중재자를 하나 만들어주면 된다.







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