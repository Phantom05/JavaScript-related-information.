const  moment   = require('moment-timezone');

try{
  // var d = new Date(2015, 0,1);
  // console.log(d);
  // console.log(d.valueOf());
  // console.log(
  //   new Date(d.valueOf())
  // );

 const d = moment().tz('Asia/Seoul').format('MM/DD/YYYY hh:mm:ss');

 console.log(d);

 // UTC를 기준으로 유닉스 타임 스템프를 저장하므로 Date객체를 그냥 전송해도 일반적으로 안전함.
 var before = {d:new Date().valueOf()}
 console.log(
  JSON.stringify(before.d)
 );
}
catch(e){
  console.log(e.message);
}




console.log(
  moment().subtract(5,'minutes').format('hh:mm:ss')
);






function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    type == 'number'  &&  (value > -1 && value % 1 == 0 && value < length);
}

function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

function isArrayLike(value) {
  return value != null && value.length > 1 && typeof value !== 'function'
}

function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;

}
function chunk(array, size, guard) {
  if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
    size = 1;
  } else {
    size = nativeMax(parseInt(size), 0);
  }
  var length = array == null ? 0 : array.length;
  if (!length || size < 1) {
    return [];
  }
  var index = 0,
      resIndex = 0,
      result = Array(nativeCeil(length / size));

  while (index < length) {
    result[resIndex++] = baseSlice(array, index, (index += size));
  }
  return result;
}



function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}