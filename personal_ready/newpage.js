console.log(
  document.forms.hello
);

console.log(
  document.querySelector('label').htmlFor = "wow"
);

document.querySelector('label').className = "whatthe";


var para = document.getElementById('controls');
var list = para.firstElementChild.attributes;
console.log(list);


var doflist = document.getElementById('doglist');

console.log(
  doflist.appendChild(doflist.children[0])
);


/**
 * createElement function --
 * @param {*} name 
 * @param {*} attributes 
 * elt("input",{type:"button",value:"click"},"DOM에 관하여")
 * elt("input",null,"DOM에 관하여")
 */
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

console.log(
  elt("input","Test")
);

console.log(
  elt("input",{type:"button",value:"click"},"DOM에 관하여")
);

var bloddTypes = ["A형","B형","O형","AB형"];
var form = elt("form",{id:"menu"});
var select = elt("select",{name:"bloddtype",id:"bloodtype"});

bloddTypes.forEach((type,idx)=>{
  select.appendChild(elt("option",{value:idx},type))
});
form.appendChild(select);
document.body.appendChild(form)
