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