/**-----------------------------------------------------------------*
 * 화면을 구성하는 요소를 생성하고 요소에 이벤트 리스너를 등록한다.
 * -----------------------------------------------------------------*/

function createPatinter(parent, width, height){
  // 타이틀
  var title = elt("h2",null, "Simple Patiner");
  // canvas 요소와 렌더링 컨텍스트를 가져온다
  var [canvas,ctx] = createCanvas(width,height);
  // 도구 막대 : controls 객체의 프로퍼티를 순회하면서 등록한다
  var toolbar = elt("div", null);
  for(var name in controls){
    toolbar.appendChild(controls[name](ctx));
  }
  toolbar.style.fontSize = "small";
  toolbar.style.marginBottom = "3px";
  // toolbar 요소와 canvas 요소를 지정한 요소(parent)의 자식 요소로 삽입한다.
  parent.appendChild(elt("div",null,title,toolbar,canvas));
}

function createCanvas(canvasWidth,canvasHeight){
  var canvas = elt("canvas",{width:canvasWidth,height:canvasHeight});
  var ctx = canvas.getContext("2d");
  canvas.style.border = '1px solid gray';
  canvas.style.cursor = "pointer";
  // 그리기 도구를 mousedown 이벤트의 이벤트 리스너로 등록한다
  canvas.addEventListener('mousedown', function(e){
    // Firefox 대책 : 색상을 선택하면 change 이벤트를 강제로 발생시킨다.
    var event = document.createEvent("HTMLEvents");
    event.initEvent("change",false,true);
    colorInput.dispatchEvent(event);
    // 선택한 그리기 도구를 초기화
    paintTools[paintTool](e.ctx);
  }, false);
  return [canvas,ctx];
}

/**
 * 유틸리티
 */
// * element의 왼쪽 위 모서리에서 마우스의 상대 위치를 가져온다.
function relativePosition(event,element){
  var rect = element.getBoundingClientRect();
  return {x:Math.floor(event.clientX - rect.left),
          y:Math.floor(event.clientY - rect.top)};
}

/**
 * 그리기 도구
 * paintTools 메서드는 사용할 수 있는 그리기 도구의 모음입니다.
 * 각 그리기 도구는 그림을 그리기 위한 각종 설정과 이벤트 리스너의 등록을 담당합니다.
 * 각 메서드는 controls.painter를 통해 자동으로 도구 선택 메뉴에 추가됩니다.
 * 메뉴에서 선택한 도구는 변수 paintTool에 저장되며 그림을 그릴 대 사용합니다.
 * 그리기 도구를 추가하려면 paintTools 메서드에 새로운 그리기 도구를 추가하십시오.
 */
var paintTool; // 선택된 그리기 도구(controls.painter로 선택)
var paintTools = Object.create(null); // 그리기 도구 객체
// * brush : 브러시 도구
paintTools.brush = function(e, ctx){
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  // Canvas 화면을 img에 저장한다.
  var img = ctx.getImageData(0,0,ctx.canvas.width, ctx.canvas.height);
  // canvas 요소에 대한 마우스 포인터의 상대 위치를 구한다.
  var p = relativePosition(e, ctx.canvas);
  // 경로를 정의한다.
  ctx.beginPath();
  ctx.moveTo(p.x,p.y);
  // 드래그 이벤트 리스너를 등록한다.
  setDragListeners(ctx, img, function(q){
    ctx.lineTo(q.x, q.y); // 경로를 추가한다
    ctx.stoke() // 경로를 그린다.
  });
};

// * line: 선 그리기 도구
paintTools.line = function(e,ctx){
  // 1. 그림을 그리기 위한 초기화 처리 : 선의 끝부분을 둥글게 만든다
  ctx.lineCap = "round";
  // 2. 그림을 그리기 전에 Canvas에 담긴 그림을 img에 저장한다

}
