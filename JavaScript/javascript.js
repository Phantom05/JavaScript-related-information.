
// 이벤트 위임

//아이템 갯수마다 이벤트 리스너를 생성, 등록하는 것보다 부모 엘리먼트에 이벤트를 걸고 캡쳐링을 이용한 방법이 훨씬 효율적이다, 아이템마다 모두 이벤트를 주는 것보다 한번의 이벤트의 캡쳐링으로 걸러주는것이 훨씬 브라우저에 부담을 적게 주기 때문이다.

//대부분은 이렇게 하겠지만,
document.addEventListener('DOMContentLoaded', function() {

  let app = document.getElementById('todo-app');
  let items = app.getElementsByClassName('item');

  // 각 아이템에 이벤트 리스너를 등록합니다.
  for (let item of items) {
    item.addEventListener('click', function() {
      alert('you clicked on item: ' + item.innerHTML);
    });
  }

});


//이렇게 if로 걸러주는 것이 훨씬 효과적이다.
document.addEventListener('DOMContentLoaded', function() {

  let app = document.getElementById('todo-app');

  // 리스트 아이템의 전체 영역에 이벤트 리스너를 등록합니다.
  app.addEventListener('click', function(e) {
    if (e.target && e.target.nodeName === 'LI') {
      let item = e.target;
      alert('you clicked on item: ' + item.innerHTML);
    }
  });

});

//루프에서 클로져 이용하기

//setTimeout, setInterval 등 비동기식으로 작동하는 함수을 포문안에서 딜레이를 주고 싶을때, 대부분은 아래와 같이 로직을 구현할것이다.

const arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function() {
    console.log('The index of this number is: ' + i);
  }, 3000);
}

// 하지만 이렇게되면 seTimeout안에 들어가있는 i는 값이 아니라 변수이기 때문에 메모리 참조를 하게되는데, 이미 포문은 i의 값이 4를 가르키고 있기때문에 3초후 콘솔에는 4가 4번이 찍히는 현상을 경험할 수 있다. 
//동작순서 1. 포문 실행, setTimeout 실행 4번의 setTimeout함수 대기중, 3초후 i값 참조하여 4번의 4 출력



//클로저

// i 값 을 setTime 함수 안에 전달하여 각 함수 호출마다 올바른 값에 접근하게 합니다.
const arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
  setTimeout(function(i_local) {
    return function() {
      console.log('The index of this number is: ' + i_local);
    }
  }(i), 3000);
}
//실행 될때마다 바로 리턴시켜서 반환시켜놓는 방법이다, 안쪽 셋타임을 익명함수로 바로 실행되기 때문에 d아래쪽 i로 첫번째 값이 들어가고 그 값이 i_local로 들어가게 된다음 콘솔에 출력하는 값이 바로 반환시켜놓고 3초후 실행시키는 방식이다, 때문에 정상적으로 1,2,3,4가 출력될수 있는것이다. i의 메모리를 참조하는것이 아닌 매개변수로 받아서 값을 반환해 놓는것이다.



// 만약 let을 사용한다면 함수가 호출될때마다 바인딩이 되기 때문에 정상적으로 1,2,3,4 가 출력되는거 확인 할 수 있다.
const arr = [10, 12, 15, 21];
for (let i = 0; i < arr.length; i++) {
  // ES6 의 let 은 함수가 호출 될 때 마다 인덱스 i 값이 바인딩 되는 새로운 바인딩 기법을 사용합니다.
  // 더 자세한 내용은 다음 링크에서 확인하세요.
  setTimeout(function() {
    console.log('The index of this number is: ' + i);
  }, 3000);
}

