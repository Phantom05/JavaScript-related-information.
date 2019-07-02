var blob = new Blob(["JavaScript"], {
  type: "text/plain"
});
console.log(blob.size, blob.type);

function getElm(attr) {
  const elm = document.querySelectorAll(attr);

  return (elm.length > 1) ? Array.from(elm) : elm[0]
}


function getBlob(url, callback) {
  var req = new XMLHttpRequest();
  req.onload = function () {
    callback(req.response);
  }
  req.open("GET", url);
  req.responseType = "blob";
  req.send(null);
}



function readTextFile(f, callback) {
  var reader = new FileReader();
  reader.onload = function () {
    callback(reader.result);
  };
  reader.onerror = function (e) {
    console.log(`Error`, e);
  };
  reader.readAsText(f);
}

window.onload = function () {
  var input = getElm("input");
  var output = getElm("output");
  input.onchange = function (e) {
    var files = e.target.files;
    if (files[0].type.substring(0, 5) !== "text/") return;
    readTextFile(files[0], function (text) {
      output.innerHTML = text;
    });
  };
};

var a = new Uint8Array([1, 2, 3])
var blob = new Blob([a], {
  type: "application/octet-binary"
});
var blobURL = URL.createObjectURL(blob)
var img = document.createElement('img');
img.src = blobURL;




var preview = getElm('#preview');
var test = getElm('#test');
test.addEventListener('change', function (e) {
  var reader = new FileReader();
  // reader.readAsText();
  reader.onload = function () {
    preview.src = reader.result;
  }
  reader.readAsDataURL(e.target.files[0])
})