
/**
abcabc2de
가장 큰 문자열을 자르는게 좋음
앞에서부터 커팅할수있음.
xababcdcdababcdcd
하면 맨앞에서부터 반복되는게 없기때문에 안됨.
 */

console.log('===========');



function overlapCount(arr){
  var count = 1;
  var name = '';
  var lock = 0;
  var newArr = [];
  var i = 0 ;
  while(i < arr.length){
    let prev = arr[i], next =arr[i+1];
    if(!!next && prev == next){
      if(lock === 0){  name = prev}
      lock = 1, count+=1;
    }else{
      (lock === 1)? newArr.push(count+name) : newArr.push(prev);
      count = 0,lock = 0,name = '';
    }
    i++;
  }
  return newArr.join('')
}

function sepWord(word,sepLen){
  var arr = [],len = word.length;
  if(sepLen > Math.floor(len / 2) ) return word;
  var i = 0;
  while(i< len ){
    arr.push(word.slice(i,i+sepLen));
    i+= sepLen;
  }
  // console.log(arr,sepLen);
  return overlapCount(arr);
}

function solution(s) {
  var len = s.length, countArr = [];
  if (s.lastIndexOf(s[0]) === 0) return len;
  var i = 1;
  while(i < len){
    countArr.push(sepWord(s,i));
    i++;
  }
  return countArr.sort((x,y)=>x.length - y.length)[0].length
}


//14
console.log(
  solution(`abcabcabcabcdededededede`)
);

/**
 * 1일때는 length 즉 24
 * 2개일떈 2개씩 잘리나 봐야함. 
 */


// var a = [];
// var cnt = 0;
// function solution (ary_size, oParen, cParen) {
//    if (oParen == 0 && cParen == 0) {
//       console.log(a);
//       var s = a.join('');
//       console.log(s);
//       return false;
//    }

//    if (oParen > 0) {
//       a[ary_size] = '(';
//       solution(ary_size + 1, oParen - 1, cParen + 1);
//    }
//    if (cParen > 0) {
//       a[ary_size] = ')';
//       solution(ary_size + 1, oParen, cParen - 1);
//    }
// }

// var inputString = prompt('input');
// solution(0, inputString, 0);