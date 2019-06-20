

function getScrollTop() {
  if (window.pageYOffset !== undefined) {
    return window.pageYOffset;
  } else {
    return document.documentElement.scrollTop || document.body.scrollTop
  }
}

function getScrollLeft() {
  if (window.pageXOffset !== undefined) {
    return window.pageXOffset;
  } else {
    return document.documentElement.scrollLeft || document.body.scrollLeft;
  }
}


if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
var element = document.getElementById('sec3');
var rect = element.getBoundingClientRect();
// scrollTo(rect.left+ getScrollLeft(), rect.top + getScrollTop());

function smoothScroll(id, durationTime) {
  var TIME_INTERVAL = 30;
  var element = document.getElementById(id);
  if (!element) return;
  var ey = element.getBoundingClientRect().top;
  var dy = ey * TIME_INTERVAL / durationTime;
  var dirention = dy > 0 ? 1 : -1;
  var timer = setInterval(() => {
    scrollBy(0, dy); ey -= dy;
    if (dirention * ey <= 0) clearInterval(timer);
  }, TIME_INTERVAL);
}

// document.getElementById('abc').scrollIntoView()


  var 잉생 = (function () {
    function 젠장() {
      this.level = 0;
      this.head =null;
    }
    function Node(data) {
      this.노오력 = data;
    }

    젠장.prototype.열심히 = function () {
      let node = new Node();
      return ++this.level;
    }
    젠장.prototype.빡센노력 = function(data){
      return this.level += data;
    }
    젠장.prototype.상황 = function(){
      return this.head = new Node(this.level);
    }

    return 젠장
  })()

  const 천천히 = new 잉생();
  천천히.열심히();
  천천히.열심히();
  천천히.빡센노력(10);
  

  console.log(천천히.상황());




var Stack = (function() {
  function Stack() {
    this.top = null;
    this.count = 0;
  }
  function Node(data) {
    this.data = data;
    this.next = null;
  }
  Stack.prototype.push = function(data) {
    var node = new Node(data);
    node.next = this.top;
    this.top = node;
    return ++this.count;
  };
  Stack.prototype.pop = function() {
    if (!this.top) { // stack underflow 방지
      return false;
    }
    var data = this.top.data;
    this.top = this.top.next;
    // 예전 this.top의 메모리 정리
    this.count--;
    return data;
  };
  Stack.prototype.stackTop = function() {
    return this.top.data;
  };
  return Stack;
})();

var stack = new Stack();
console.log(stack);



var selectBox = document.getElementById('selectedBox');
var optios = selectBox.getElementsByTagName('option');
console.log(optios);
console.log(document.forms.dd);


class List{
  constructor(){
    this.setVars();
    this.registerEvents();
    this.init();
  }

  setVars(){
    this.box = document.querySelectorAll('.box');
    this.world = document.getElementById('world');
    this.nSliceIndx = 0;
  }

  registerEvents(){
    this.world.addEventListener('click',function(){
      this.nSliceIndx =+ 11;
      console.log(this.nSliceIndx);
      this.channlList()
    })
  }

  getDate(){
    const url = "";
    fetch(url).then(function(response){
      if(response.ok){

      }else{

      }
    }).then((responseData)=>{
      this.elLoader
    })
  }
  init(){
    this.getDate();
  }

  channlList(){
    console.log('channlList');
  }
}

const myList = new List();

// const onClick =(one,two,three)=> (event) =>{
//   console.log(event.target);
//   console.log(one,two,three);
// }
// document.body.addEventListener('click',onClick(1,2,3))


const 퇴근좀해 =(그만가) => ( 퇴근해)=>{
  console.log(그만가);
  console.log(퇴근해);
}
document.body.addEventListener('click',퇴근좀해('벌써 1시가 넘었어..'))




console.clear();

var Module2 = (function(){


  class somePage extends Module{
    constructor(){
      super();
      this.init();
    }
  
    async init(){
      this.setVars();
      this.setEvents();
      this.setDate();
    }
  
  
    setVars(){
      this.helloworld();
    }
  
    setEvents(){
  
    }
  
    setDate(){
  
    }
  
  
  }

  let page = new somePage();


})();


function elt(name,attributes){
  var node = document.createElement(name);
  if(attributes && typeof attributes !== "string"){
    for(var attr in attributes){
      if(attributes.hasOwnProperty(attr)){
        node.setAttribute(attr, attributes[attr]);
      }
    }
  }
  for(var i =2; i< arguments.length; i++){
    var child = arguments[i];
    if(typeof child == "string"){
      child = document.createTextNode(child);
    }
    node.appendChild(child);
  }
  return node;
}

console.log(elt('input'));

window.onload = function(){
  createIconEditor(document.body,16,16);
}

function createIconEditor(parent,nx,ny){
  var color = elt("input",{type:"color"});
  var clear = elt("input",{type:"button",value:"모두 삭제"});
  clear.onclick = function(e){
    ClientRectList.forEach(function(td){ td.style.backgroundColor = "white"});
  };

  var table = elt("table");
  table.style.borderCollase = "collapse";
  table.style.marginTop = "5px";
  var cells = [];
  for(var j =0; j <ny;j++){
    var tr = elt("tr");
    table.appendChild(tr);
    for(var i = 0; i <nx; i ++){
      var td =elt("td");
      cells.push(td);
      td.style.width = td.style.height = "15px";
      td.style.border = '1px solid gray';
      tr.appendChild(td);
      td.onclick = function changeColor(e){
        e.target.style.backgroundColor = color.value;
      };
    }
  }
  parent.appendChild(color)
parent.appendChild(clear)
parent.appendChild(table);
}
// parent에 각각의 요소를 ㅅ ㅏㅂ입


var element = document.getElementById('note');
console.log(element.style.height);
var computedStyles = getComputedStyle(element);
console.log(computedStyles.color);


window.onload = function(){
  var element = document.getElementById('box');
  element.addEventListener('click',changeColor(1),false);


  function changeColor (da){
    console.log(da);
    return function(e){
      e.currentTarget.style.backgroundColor = "red"
    }
    
  }
}


document.getElementById('www').addEventListener('click',function(e){
  this.removeEventListener('click',arguments.callee,false)
})


var box = elt("div",null,"JavaScript");
document.body.appendChild(box);
var boxOffsetX,boxOffsetY;
box.style.display ="inline-block";
box.style.position = "absoulte";
box.style.padding = "10px";
box.style.backgroundColor = "blue";
box.style.color = "white";
box.style.cursor = "pointer";

box.addEventListener('mousedown', function mouseDownListener(e){
  document.addEventListener('mousemove', mouseDownListener, false);
},false)

function mouseMoveListener(e){
  box.style.left = e.pageX - boxOffsetX + "px";
  box.style.top = e.pageY - boxOffsetY + "px";
}