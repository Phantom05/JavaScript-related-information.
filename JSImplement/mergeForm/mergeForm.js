console.log('merge');

function getCloneNode(elm) {
  return elm.cloneNode(true);
}

function nullCheck(val) {
  if (typeof val == "string") val = val.trim();
  return (val != "undefined" && (val != null && val.length > 0)) ? true : false;
}

function elt(name, attributes) {
  var node = document.createElement(name);
  if (attributes && typeof attributes !== "string") {
    for (var attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        node.setAttribute(attr, attributes[attr]);
      }
    }
  }
  for (var i = 2; i < arguments.length; i++) {
    var child = arguments[i];
    if (typeof child == "string") {
      child = document.createTextNode(child);
    }
    node.appendChild(child);
  }
  return node;
}


function equal(dist, dest) {
  return (dist === dest) ? true : false;
}

function doArrayClassControl(arr, action, className, all) {
  arr.forEach((elmName, idx) => {
    let elements = document.querySelectorAll(`${elmName}`);
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList[`${action}`](className)
    }
  })
  return
}

function removeElement(target){
  var targetElm = document.querySelector(target);	//제거하고자 하는 엘리먼트
  targetElm.parentNode.removeChild(targetElm);
}
// 


function getExistElmInForm(elm) {
  let form = document.querySelector(elm);
  const checkArr = ['checkbox', 'radio'];
  const valueArr = ['text', 'search'];

  let elmArr = [];

  let formChildren = Array.from(form.elements);

  let formName = form.id;
  formChildren.map(formChildrenList => {
    let childrenNodeName = formChildrenList.nodeName;

    if (equal(childrenNodeName, "INPUT")) {

      if (checkArr.includes(formChildrenList.type) && formChildrenList.checked) {
        let elementsCloneNode = getCloneNode(formChildrenList);
        elementsCloneNode.setAttribute('data-merge-target-form', formName);
        elmArr.push(elementsCloneNode);
      }

      if (valueArr.includes(formChildrenList.type) && nullCheck(formChildrenList.value)) {
        let elementsCloneNode = getCloneNode(formChildrenList);
        elementsCloneNode.setAttribute('data-merge-target-form', formName);
        elmArr.push(elementsCloneNode)
      }

    } else if (equal(childrenNodeName, "SELECT")) {
      let elementsCloneNode = getCloneNode(formChildrenList);
      elementsCloneNode.setAttribute('data-merge-target-form', formName);
      elmArr.push(elementsCloneNode)


    } else if (equal(childrenNodeName, "BUTTON")) {
      // console.log(formChildrenList);
      // let elementsCloneNode = getCloneNode(formChildrenList);
      // mergeForm.appendChild(elementsCloneNode)
    }
  })

  return elmArr
}


function setPageNation(config) {
  let pageForm = document.getElementById(config.formId);
  let tempElm = elt("div", {id: 'tempElm'});
  pageForm.setAttribute('method', config.method);
  pageForm.after(tempElm);

  for (let i = config.startPage; i < config.startPage + config.pageLimit; i++) {
    let postBtnElm = elt("button", {type: "button",'data-page-btn': "postBtn",
    class:(config.btnClass)?config.btnClass:''
  }, String(i));

    if (equal(i, config.curPage)) postBtnElm.setAttribute('value', 'click'); // 초기화  value setting

    postBtnElm.addEventListener('click', function (e) {
      Array.from(tempElm.getElementsByTagName('button')).forEach(tagList => //초기화
        tagList.removeAttribute('value'));
      this.setAttribute('value', 'click'); // 클릭 세팅
      let fomrInBtn = document.querySelectorAll(`#${tempElm.id} button`);
      let selectBtnElm = Array.from(fomrInBtn).filter(btnList => 
        btnList.getAttribute('value'))[0];
      let formInInput = pageForm.getElementsByTagName('input');
      let hiddenInput = Array.from(formInInput).filter(inputList =>
        inputList.hasAttribute('hidden'))[0];

      hiddenInput.setAttribute('value', selectBtnElm.textContent);
      pageForm.setAttribute('action', `${config.action}/${selectBtnElm.textContent}`);

      let includeForm = config.includesForm;
      let properties = (nullCheck(includeForm)) ? includeForm : 0;

      if (properties.length) { //includeForm이 있으면.
        properties.map(formList => getExistElmInForm(formList).forEach(elmList=>{
          elmList.setAttribute('hidden',true);
          pageForm.appendChild(elmList);
        }))
      }
      pageForm.submitBtn.click();
    })
    tempElm.appendChild(postBtnElm);
  }
  pageForm.addEventListener('submit', function (e) {
    let defaultWasPrevented = e.defaultPrevented;
    if(!defaultWasPrevented){ //  막혀있지 않으면.
      removeElement(`#${tempElm.id}`)
      removeElement(`#${pageForm.id}`)
    }
  })

}


function mergeForm(config) {
  let allForm = Array.from(document.querySelectorAll('[data-merge-form="true"]'));

  // all form prevent
  allForm.map(formList => {
    formList.addEventListener('submit', function (e) {
      e.preventDefault();
    })
  })
  // create mergeform
  let mergeForm = elt("form", {
    id: 'mergeForm',
    method: config.method,
    action: config.action
    // ,hidden:true
  })
  document.body.appendChild(mergeForm);


  const checkArr = ['checkbox', 'radio'];
  const valueArr = ['text', 'search'];

  allForm.map(formList => {
    let formChildren = Array.from(formList.elements);
    // console.log(formList);
    let formName = formList.id;
    formChildren.map(formChildrenList => {
      let childrenNodeName = formChildrenList.nodeName;

      if (equal(childrenNodeName, "INPUT")) {

        if (checkArr.includes(formChildrenList.type) && formChildrenList.checked) {
          let elementsCloneNode = getCloneNode(formChildrenList);
          elementsCloneNode.setAttribute('data-merge-target-form', formName);
          mergeForm.appendChild(elementsCloneNode);
        }

        if (valueArr.includes(formChildrenList.type) && nullCheck(formChildrenList.value)) {
          let elementsCloneNode = getCloneNode(formChildrenList);
          elementsCloneNode.setAttribute('data-merge-target-form', formName);
          mergeForm.appendChild(elementsCloneNode)

        }

      } else if (equal(childrenNodeName, "SELECT")) {
        let elementsCloneNode = getCloneNode(formChildrenList);
        elementsCloneNode.setAttribute('data-merge-target-form', formName);
        mergeForm.appendChild(elementsCloneNode)


      } else if (equal(childrenNodeName, "BUTTON")) {
        // console.log(formChildrenList);
        // let elementsCloneNode = getCloneNode(formChildrenList);
        // mergeForm.appendChild(elementsCloneNode)
      }
    })

  })
}



//mergeForm을 사용하려면, 머지폼 다음에 페이지네이션을 선언해야함.
let mergeFormConfig = {
  method: "post",
  action: '/',
  ajax: false
}

mergeForm(mergeFormConfig);


let pageConfig = {
  startPage: 1,
  endPage: 5,
  pageLimit: 5,
  curPage: 5,
  totalPage: 201,
  formId: "pageForm",
  action: '/info/client/245',
  method: "get",
  ajax: false,
  btnClass:"pageNum"

}
setPageNation(pageConfig);

// 





