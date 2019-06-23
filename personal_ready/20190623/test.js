

function Person(name){
  this.name = name;
}
Person.prototype.handleEvent = function(){
  console.log(`Hello! ${this.name}`);
}

var person = new Person('Tom');
var button = document.getElementById('button');

button.addEventListener('click',{
  handleEvent:function(e,t){
    console.log(this);
    console.log(this.wow);
  },
  wow:'22'
},false);



//set var

var box  = document.getElementById('box');


// data 
function doAxios(config){
  return axios({
    method: config.method,
    url: config.url,
  })
}


//event
box.addEventListener('click',changeBgColor('red'),false);



//view
function changeBgColor(color){
  
  return function(e){

    let axiosConfig = {
      method:"get",
      url:"https://api.bithumb.com/public/ticker/BTC"
    }
    console.log(doAxios(axiosConfig));
    e.currentTarget.style.backgroundColor = color;
  }
}




