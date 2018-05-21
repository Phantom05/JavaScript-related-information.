//기능 구현 

//3 toggle
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


//img file upload
{/* <img id="preview" src="" width="700" alt="로컬에 있는 이미지가 보여지는 영역">
<input type="file" id="getfile" accept="image/*"> */}

var file = document.querySelector('#getfile');

file.onchange = function () {
  var fileList = file.files;//files?

  // 읽기
  var reader = new FileReader();// FileReader 메소드를 만드는거 부터 시작되는데 이 객체 안에 다양한 메소드가 있기때문에 아래 처럼 readAsText같은 메소드를 사용할 수 있는거다. 이런곳에서 이제 this라든지 그런 것들이 사용된다! 이런게 객체지향!!!!!
  reader.readAsDataURL(fileList[0]);//readAsText

  //로드 한 후
  reader.onload = function () {
    if(fileList[0].type.match(/image\//)){
      document.querySelector('#preview').src = reader.result;
    }
  };
};