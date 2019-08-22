function getElm(attr) {
  const elm = document.querySelectorAll(attr);

  return (elm.length > 1) ? Array.from(elm) : elm[0]
}


var dragbox = getElm('#dragbox');
var drogbox = getElm('#dropbox');

drogbox.addEventListener

drogbox.addEventListener('dragenter', function (e) {
  e.target.style.borderColor = "red";
})

drogbox.addEventListener('dragleave', function (e) {
  e.target.style.borderColor = "gray"
})
drogbox.addEventListener('drop', function (e) {
  e.target.style.borderColor = "gray"
})






window.onload = function () {

  var color = getElm("#color");
  var colorDropBox = getElm("#colorDropbox");

  color.ondragstart = function (e) {
    e.dataTransfer.setData("abac", e.target.value);
    console.log(e.target.value);
    console.log(e.dataTransfer);
  }

  colorDropBox.ondragover = function (e) {
    e.preventDefault();
  }
  colorDropBox.ondrop = function (e) {
    e.preventDefault();
    console.log(e.dataTransfer.getData("abac"));
    e.target.style.backgroundColor = e.dataTransfer.getData("abac");
  }
}


function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      console.log(e.target.result);
      $('#image_section').attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#imgInput").change(function () {
  readURL(this);
});


var drop = document.getElementById('drop');
drop.ondragover = function (e) {
  e.preventDefault(); // 이 부분이 없으면 ondrop 이벤트가 발생하지 않습니다.
};
drop.ondrop = function (e) {
  e.preventDefault(); // 이 부분이 없으면 파일을 브라우저 실행해버립니다.
  var data = e.dataTransfer;
  if (data.items) { // DataTransferItemList 객체 사용
    for (var i = 0; i < data.items.length; i++) { // DataTransferItem 객체 사용
      if (data.items[i].kind == "file") { // 아이템 종류가 파일이면
        var file = data.items[i].getAsFile(); // File API 사용
        // alert(file.name);
        e.target.style.backgroundImage = `url(${file.name})`
      }
    }
  } else { // File API 사용
    for (var i = 0; i < data.files.length; i++) {
      console.log('f');
      alert(data.files[i].name);
    }
  }

  console.log(file);
};






var holder = getElm('#holder');
var progress = getElm("#uploadprogress");

holder.ondragover = function () {
  this.className = 'hover';
  return false;
};
holder.ondragend = function () {
  this.className = '';
  return false;
};
holder.ondrop = function (e) {
  this.className = '';
  e.preventDefault();
  readfiles(e.dataTransfer.files);
}

function readfiles(files) {
  // 파일 미리보기
  previewfile(files[0]);

  var formData = new FormData();
  formData.append('upload', files[0]);

  // var xhr = new XMLHttpRequest();
  // xhr.open('POST', './devnull.php');
  // xhr.onload = function () {
  //   progress.value = 100;
  // };

  // xhr.upload.onprogress = function (event) {
  //   if (event.lengthComputable) {
  //     var complete = (event.loaded / event.total * 100 | 0);
  //     progress.value = progress.innerHTML = complete;
  //   }
  // }

  // xhr.send(formData);
}

function previewfile(file) {
  var reader = new FileReader();
  reader.onload = function (event) {
    var image = new Image();
    image.src = event.target.result;
    image.width = 250; // a fake resize
    // holder.appendChild(image);
    holder.innerHTML = ""
    holder.append(image) ;
  };

  reader.readAsDataURL(file);
}