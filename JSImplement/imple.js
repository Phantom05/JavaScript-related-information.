//기능 구현 

//3토글
let allgb =document.getElementById('allgb');

allgb.addEventListener('click',function(e){
  let allbgLi =document.getElementsByClassName('allbgLi');
  let allgbTarget = e.target;
  if(allgbTarget.nodeNamd='LI'){
    for(var i =0; i<allbgLi.length;i++){
      allbgLi[i].firstElementChild.classList.remove('git_uodate__active');
    }
  }
  allgbTarget.firstElementChild.classList.add('git_uodate__active');
})