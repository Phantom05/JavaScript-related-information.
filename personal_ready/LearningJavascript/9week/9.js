// 제너레이터는 양방향 통신을 가능하게 함.

function nfcall(f,...args){
  return new Promise(function(resolve,reject){

  })
}

var a = [],res=[];
function solution (ary_size, middle, c) {
   if (middle == 0 && c == 0) {
      var s = a.join('');
      res.push(s)
      return false;
   }

   if (middle > 0) {
      a[ary_size] = '(';
      solution(ary_size + 1, middle - 1, c + 1);
   }
   if (c > 0) {
      a[ary_size] = ')';
      solution(ary_size + 1, middle, c - 1);
   }

}
solution(0, 3, 0);
console.log(res);

// var inputString = prompt('input');

/*
 ((()))
 ((()())
 (()())
 (()(())
 ()(())
 (()())
*/

var d = [];
// function dp(x){    
//   if(x == 1) return 1;
//   if(x == 2) return 1;
//   if(d[x] != 0 ) return d[x]
//   return d[x] = dp( x-1) + dp(x-2)
// }
var g = [];
function dp(x){
  if(x ==1 || x==2) return 1;
  if(g.indexOf(x) != -1) return g[g.indexOf(x)];
  else{
    // g[] = dp( x-1) + dp(x-2)
    return  
  }
}

console.log(
  dp(3)
);

var a = [1,1,2];
a[3] = 2;
console.log(a);


class addClass{
  constructor(className){
    this.className = className;
  }
  getElements(elm){
    let elements = document.querySelectorAll(elm);
    let em = Array.prototype.slice.call(elements);
    return em;
  }
  SET(element){
    let v = this.getElements(element)
    v.reduce((x,target)=>  target.classList.add(this.className),0)
  }
  RM(elm){
    let v = this.getElements(elm);
    v.reduce((x,target)=>  target.classList.remove(this.className),0)
  }
}

let weapon = new addClass('abc');
weapon.SET('button')
weapon.SET('body')
weapon.RM('button')