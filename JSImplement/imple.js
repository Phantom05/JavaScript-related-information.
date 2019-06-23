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



// modal platform START

/*
<!-- madal flatt form start -->
<!-- make use button and class="modalBt" and button data-name="" == modal data-name=="" -->
  <!-- Trigger/Open The Modal -->
  <button id="myBtn" class="modalBt" data-name="info">Open Modal</button>
  <!-- The Modal / background-->
  <div id="myModal" class="modal" data-name="info">
    <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal__close">X</span>
        Information
      </div>
      <div class="modal-body">
        I'm Information
      </div>
      <!-- <div class="modal-footer"></div> -->
    </div>
  </div>
  <!-- madal flatt form end -->

*/

let modalPlatForm = function(){
  let modalAmount = document.getElementsByClassName('modalBt');
  let modal =document.getElementsByClassName('modal');
  let modalClost = document.getElementsByClassName('modal__close');
  
  for(var i =0;i<modalAmount.length;i++){
   modalAmount[i].addEventListener('click',function(){
     for(var j=0;j<modal.length;j++){
      if(modal[j].getAttribute('data-name') == this.getAttribute('data-name')){
       let modalTarget = modal[j];
       let modalClose = modalClost[j];
       modalTarget.style.display='block';
  
       modalClose.addEventListener('click',function(){
        modalTarget.style.display='none';
       })
       window.addEventListener('click',function(e){
         if(e.target == modalTarget){
          modalTarget.style.display='none';
         }
       })
      }
     }
   })
  }
}
modalPlatForm()

// modal platform END