

function elt(name, attributes) {
  var frag = document.createDocumentFragment();
  var node = document.createElement(name);
  if (attributes && typeof attributes !== "string") {
    for (var attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        node.setAttribute(attr, attributes[attr]);
      }
    }
  }
  for (var i = 2; i < arguments.length; i++) {
    var child = arguments[i];
    if (typeof child == "string") {
      child = document.createTextNode(child);
    }
    node.appendChild(child);
  }
  
  return frag.appendChild(node)
} 

function frag(){
  return document.createDocumentFragment();
}


var p, t, frag;
frag = document.createDocumentFragment();


// p = document.createElement('p');
// t = document.createTextNode('first paragraph');
// p.appendChild(t);
// frag.appendChild(p);

// p = document.createElement('p');
// t = document.createTextNode('second paragraph');
// p.appendChild(t);
// frag.appendChild(p);


// document.body.appendChild(frag)
// console.log(frag);


// console.log(
//   elt("input")
// );

// document.querySelector('#aaa').getElementsByTagName('input')