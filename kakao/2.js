function solution(p) {
  if(p =='') return p;
  let sep = p.split('').sort();
  let newArr = sep.reduce((arr,val)=>{
    if(val == '('){
      arr[0].push(val)
    }else if( val === ')'){
      arr[1].push(val)
    }
    return arr;
  },[[],[]])
  var 균형잡힌괄호문자열 = newArr[0].length == newArr[1].length;
  var 올바른괄호문자열;
  if(균형잡힌괄호문자열){
    var u = newArr;
    var v = '';
    trans(newArr)
  }

  var answer = '';
  return answer;
}

function trans(arr){
  
}


console.log(
  solution("()))((()")
);