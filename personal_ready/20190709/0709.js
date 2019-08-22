var abc = 10;
console.log(abc);


let aaa = document.getElementById('#aaa');


aaa.animate([
  // keyframes
  { transform: 'translateY(0px)' }, 
  { transform: 'translateY(-300px)' },
  {opacity:0}
], { 
  // timing options
  duration: 1000,
  iterations: Infinity
});