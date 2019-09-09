function solution(words, queries) {
  return queries.map(list =>{
    var len = list.length, l  = list.replace(/[?]/gi,""), type = (list[0] == '?')?'first':'last';
    return sub(words,l,len-l.length,type)
  })
}

function sub(words,list,len,type){
  return words.reduce((arr,val,idx)=>{
    var valLen = val.length;;
    if(valLen === list.length + len){
      if(type == 'first'){
        if((val.replace(val.substr(0,len),'')) == list){
          arr.push(valLen)
        }
      }else if((val.replace(val.substr(valLen-len,len),'')) == list){
        arr.push(valLen)
      }
    }
    return arr;
  },[]).length
}

console.log(
  solution(
  ["frodo", "front", "frost", "frozen", "frame", "kakao"],
  ["fro??", "????o", "fr???", "fro???", "pro?"])
);