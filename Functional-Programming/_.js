


function _filter(users, predi) {
  var new_list = [];
  _each(users,function(val){
    if (predi(val)) new_list.push(val);
  })
  return new_list;
}

function _map(list,mapper) {
  var new_list = [];
  _each(list,function(val){
    new_list.push(mapper(val))
  });
  return new_list
}
 
function _each(list,iter,str = 0,len = list.length){
  for (var i = str; i < len; i++) {
    iter(list[i]); 
  }
  return list
};

function _curry(fn){ 
  return function(a,b){
    return arguments.length == 2
    ? fn(a,b)
    : function(b){ return fn(a,b) }
  }
}  

function _curryr(fn){
  return function(a,b){
    return arguments.length == 2
    ? fn(a,b)
    : function(b){ return fn(b,a) }
  }
}

var _get = _curryr(function (obj,key){
  return obj ==null? undefined: obj[key];
})
 