function setPageNation(config) {
  let pageForm = document.getElementById(config.formId);
  pageForm.setAttribute('method', config.method);
  

  let tempElm = elt("div", {id: 'tempElm'});
  pageForm.after(tempElm);
  for (let i = config.startPage; i < config.startPage + config.pageLimit; i++) {
    let postBtnElm = elt("button", {
      type: "button",
      'data-page-btn': "postBtn"
    }, i + '');

    if (equal(i, config.curPage)) { // 초기화  value setting
      postBtnElm.setAttribute('value', 'click')
    }

    postBtnElm.addEventListener('click', function (e) {
      Array.from(tempElm.getElementsByTagName('button')).forEach(tagList => { // 초기화
        tagList.removeAttribute('value')
      });
      this.setAttribute('value', 'click'); // 클릭 세팅
      let selectBtnElm = Array.from(document.querySelectorAll(`#${tempElm.id} button`)).filter(btnList => {
        return btnList.getAttribute('value')
      })[0];

      let hiddenInput = Array.from(pageForm.getElementsByTagName('input')).filter(inputList => {
        return inputList.hasAttribute('hidden')
      })[0];
      hiddenInput.setAttribute('value', selectBtnElm.textContent);
      pageForm.setAttribute('action', `${config.action}/${selectBtnElm.textContent}`);
      console.log(pageForm);


      let includeForm = config.includesForm;
      let properties = (nullCheck(includeForm)) ? includeForm : 0;
      if (properties.length) { //includeForm이 있으면.
        properties.map(formList => {
          getExistElmInForm(formList).forEach(elmList=>{
            // checkExtiseElm(pageForm,elmList)
            elmList.setAttribute('hidden',true);
            pageForm.appendChild(elmList);
            // console.log(Array.from(pageForm.elements).includes(elmList));
            // !pageForm.contains(elmList)
            // if(!Array.from(pageForm.elements).includes(elmList)){
            //   pageForm.appendChild(elmList);
            // }
            // if(!pageForm.hasOwnProperty(elmList)){ // 중복방지
            //   pageForm.appendChild(elmList);
            // }
          })
        })

      }

      // pageForm.submitBtn.click();

    })
    tempElm.appendChild(postBtnElm);
  }



  // if (equal(config.method, "get")) {
  //   // get
  //   if(config.curPage > config.pageLimit){
  //    let prevBtn =  elt("a",{
  //      href:`${config.action}/${config.startPage-1}`,
  //      class: "pageNum"},'<');
  //     pageForm.insertBefore(prevBtn,pageForm.firstElementChild)
  //    }

  //   // let startPageMultiplyPageLimit= (config.startPage * config.pageLimit);
  //   // let startPagePlusPageLimit = (config.startPage + config.pageLimit);
  //   // let viewPageLimit = (startPageMultiplyPageLimit <= config.totalPage)?startPagePlusPageLimit:Math.floor(config.totalPage / config.pageLimit);

  //   for (let i = config.startPage; i <= config.endPage; i++) {
  //     let pageNum = elt("a", {
  //       href: `${config.action}/${i}`,
  //       class: `pageNum ${ equal(config.curPage ,i)?"on":""}`
  //     }, i + '');
  //     pageForm.appendChild(pageNum);
  //   }


  //   // curPageSet != totalPageSet && totalPageSet > 2
  //   // if(config.curPage > config.pageLimit){
  //   //  let prevBtn =  elt("a",{
  //   //    href:`${config.action}/${config.endPage+1}`,
  //   //    class: "pageNum"},'>');
  //   //   pageForm.appendChild(prevBtn,pageForm.firstElementChild)
  //   //  }

  // } else {
  //   // post 
  // let tempElm = elt("div", {id: 'tempElm'});
  // pageForm.after(tempElm);
  // for (let i = config.startPage; i < config.startPage + config.pageLimit; i++) {
  //   let postBtnElm = elt("button", {
  //     type: "button",
  //     'data-page-btn': "postBtn"
  //   }, i + '');

  //   if (equal(i, config.curPage)) { // 초기화  value setting
  //     postBtnElm.setAttribute('value', 'click')
  //   }

  //   postBtnElm.addEventListener('click', function (e) {
  //     Array.from(tempElm.getElementsByTagName('button')).forEach(tagList => { // 초기화
  //       tagList.removeAttribute('value')
  //     });
  //     this.setAttribute('value', 'click'); // 클릭 세팅
  //     let selectBtnElm = Array.from(document.querySelectorAll(`#${tempElm.id} button`)).filter(btnList => {
  //       return btnList.getAttribute('value')
  //     })[0];

  //     let hiddenInput = Array.from(pageForm.getElementsByTagName('input')).filter(inputList => {
  //       return inputList.hasAttribute('hidden')
  //     })[0];
  //     hiddenInput.setAttribute('value', selectBtnElm.textContent);
  //     console.log(pageForm);
  //     // pageForm.submitBtn.click();

  //   })
  //   tempElm.appendChild(postBtnElm);
  // }
  // }
  pageForm.addEventListener('submit', function (e) {
    // e.preventDefault();
  })

}



// ver 2

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







// case 3 

/**
 * 
 */
class mergeFormModule {
  constructor() {

  }
  rmAttr(target, attr) {
    var targetElm = document.querySelector(target);
    targetElm.removeAttribute(attr);
    return;
  }
  getElm(attr) {
    const elmList = Array.prototype.slice.call(document.querySelectorAll(attr), 0)
    if (elmList.length === 1) {
      return elmList[0]
    } else {
      return elmList
    }
  }

  elt(name, attributes) {
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

  getCloneNode(elm) {
    return elm.cloneNode(true);
  }

  nullCheck(val) {
    if (typeof val == "string") val = val.trim();
    return (val != "undefined" && (val != null && val.length > 0)) ? true : false;
  }

  equal(dist, dest) {
    return (dist === dest) ? true : false;
  }

  doArrayClassControl(arr, action, className, all) {
    arr.forEach((elmName, idx) => {
      let elements = document.querySelectorAll(`${elmName}`);
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList[`${action}`](className)
      }
    })
    return
  }

  rmElement(target) {
    var targetElm = document.querySelector(target); //제거하고자 하는 엘리먼트
    targetElm.parentNode.removeChild(targetElm);
  }
  setSelectBoxSelected(selecbox) {
    let opts = selecbox.options;
    for (let i = 0; i < opts.length; i++) {
      opts[i].removeAttribute('selected');
    }
    opts[selecbox.selectedIndex].setAttribute('selected', true);
  }

  getExistElmInForm(formAttr) { // NOTE: 이건됬음.
    const form = document.querySelector(formAttr);
    const checkArr = ['checkbox', 'radio'];
    const valueArr = ['text', 'search'];
    const elmArr = [];
    const formChildren = Array.from(form.elements);
    const formId = form.id;

    function setAttr(target) {
      return target.setAttribute('data-merge-target-form', formId)
    }

    formChildren.map(childList => {
      const childNodeName = childList.nodeName;
      const formObj = {
        setAttrPush: function (boolz) {
          if (boolz) {
            setAttr(childList);
            elmArr.push(childList);
          }
        },
        setAttr: function (bool) {
          if (bool) setAttr(childList);
        }
      }

      if (this.equal(childNodeName, "INPUT")) {
        formObj.setAttrPush(checkArr.includes(childList.type) && childList.checked);
        formObj.setAttrPush(valueArr.includes(childList.type) && this.nullCheck(childList.value));
        formObj.setAttr(childList.hasAttribute('hidden') && valueArr.includes(childList.type));

      } else if (this.equal(childNodeName, "SELECT")) {
        this.setSelectBoxSelected(childList);
        formObj.setAttrPush(1)
        // setAttr(childList);
        // elmArr.push(childList);

      } else if (this.equal(childNodeName, "BUTTON")) {
        formObj.setAttr(1)
        // setAttr(childList);
      }
    })
    return (this.nullCheck(elmArr)) ? elmArr : null;
  }
}


/**
 * 
 */
class mergeForm extends mergeFormModule {
  constructor() {
    super();
    this.mergeIdx = 1;
  }

  /**
   * 
   * @param {*} config 
   */
  setPageNation(config) {

    if (config.ajax) {

    } else {
      

      let test4 = new test("test", "pageHiddenInput", config.curPage, true);
      test4.setSetting();
      let test5 = new test("aaaa", "bbbb", config.curPage, false);
      test5.setSetting();



      const pageForm = document.getElementById(config.formId);
      const tempElm = this.elt("div", {id: 'tempElm'});
      const hiddenInput = this.elt("input", {
        type: "text",
        name: "pageHiddenInput",
        value: config.curPage,
        hidden:true
      }) //FIXME: 여기서 변수를 선언하고

      pageForm.setAttribute('method', config.method); //FIXME: 여기서 갑자기 폼을 세팅해주고
      pageForm.after(tempElm);
      pageForm.appendChild(hiddenInput);

      // paging button 생성 FIXME: 뭔가 이렇게 갑자기 생성들을헤서 어팬드해주고
      if(config.curPage > config.endPage){
        let prevBtn = this.elt("button",{
          type:"button",
          class:(config.prevArrowClass) ? config.nextArrowClass : ''
        },"<");
        prevBtn.addEventListener('click', function (e) {
          let clickBtn = this;
          clickBtn.setAttribute('value', config.startPage -1);
          setForm(clickBtn); // click setting
        })
        tempElm.prepend(prevBtn);
      }

      for (let i = config.startPage; i < config.startPage + config.endPage; i++) {
        let postBtnElm = this.elt("button", {
          type: "button",
          class: (config.btnClass) ? config.btnClass : ''
        }, String(i));

        if(i === config.curPage) postBtnElm.classList.add('on'); // 현재 페이지 클래스 add on 
        postBtnElm.addEventListener('click', function (e) {
          let clickBtn = this;
          clickBtn.setAttribute('value', this.textContent); // click setting
          setForm(clickBtn)
        })
        tempElm.appendChild(postBtnElm);
      }

      if(config.curPageSet !== config.totalPageSet){
        let nextBtn = this.elt("button",{
          type:"button",
          class:(config.nextArrowClass) ? config.nextArrowClass : ''
        },">");
        nextBtn.addEventListener('click', function (e) {
          let clickBtn = this;
          clickBtn.setAttribute('value', config.endPage +1);
          setForm(clickBtn); // click setting
        })
        tempElm.append(nextBtn);
      }

      // if(config.pageSet !== config.totalPageSet && )

      // 페이지네이션 안에 버튼 넣기.
      let setForm = (clickButton) => {

        hiddenInput.setAttribute('value', clickButton.getAttribute('value'));
        pageForm.setAttribute('action', `${config.action}/${clickButton.getAttribute('value')}`);

        this.getElm(`#${tempElm.id} button`).forEach(list => list.removeAttribute('value')); // init

        if (this.mergeIdx) { //안에 초기화하고 
          let includeForm = config.includesForm;
          let getIncludeForms = (this.nullCheck(includeForm)) ? includeForm : 0;
          if (getIncludeForms.length) { // exist includesForm.

            // 페이지네이션 폼 초기화 후 클릭한 버튼 넣어주기
            let crtHiddenInput = this.elt('input', {
              type: "text",
              value: clickButton.textContent,
              name: "pageHiddenInput",
              hidden:true
            });
            pageForm.innerHTML = '';
            pageForm.appendChild(crtHiddenInput);

            // 인클루드된 폼들 추려서 어팬드
            getIncludeForms.map(formList => {
              if (this.nullCheck(this.getExistElmInForm(formList))) {
                this.getExistElmInForm(formList).forEach(elmList => {
                  let tempElm = this.getCloneNode(elmList);
                  // tempElm.setAttribute('hidden', true);
                  pageForm.appendChild(tempElm);
                })
              }
            })
          }
        }

        // 전송버튼 만들어서 전송
        let submitBtn = this.elt("button", {
          type: 'submit',
          hidden: true
        });
        pageForm.appendChild(submitBtn);
        submitBtn.click();
      }

      pageForm.addEventListener('submit', function (e) {
        // e.preventDefault();
        let defaultWasPrevented = e.defaultPrevented;
        if (!defaultWasPrevented) { //  막혀있지 않으면.

        }
      })
    }
  }
  /**
   * 
   * @param {*} config 
   * data-merge-form="true"
   */
  mergeForm(config) {
    this.mergeIdx = 0
    let allForm = Array.from(document.querySelectorAll('[data-merge-form="true"]'));

    // 머지폼 할때 어차피 data-merge-form으로 잡기때문에 머지폼 안할껀 그냥 폼에다가 넣지 않으면 됨.
    let main = this;

    // create mergeform
    let mergeForm = this.elt("form", {
      id: 'mergeForm',
      method: config.method,
      action:config.action,
      // hidden:true
    });
    document.body.appendChild(mergeForm); // form 생성

    // temp event prevent
    mergeForm.addEventListener('submit', function (e) {
      // e.preventDefault();
    })

    function getAllFormDataPush() {
      let mergeFormBtn = main.elt("input", {
        type: "submit",
        name: "mergeFormBtn"
      })
      mergeForm.innerHTML = '';
      allForm.map(mergeList => {
        let getElmListFromForm = main.getExistElmInForm(`#${mergeList.id}`);
        if (getElmListFromForm) {
          getElmListFromForm.map(elmList => {
            if(elmList.name == 'pageHiddenInput') mergeForm.action = `${config.action}/${elmList.getAttribute('value')}`

            let tempElm = main.getCloneNode(elmList)
            tempElm.setAttribute('hidden', true);
            mergeForm.appendChild(tempElm)
          })
        }
      })/
       // 각폼들 전송시 머지폼 전송
      mergeForm.appendChild(mergeFormBtn);
      mergeFormBtn.click(); 
    }

    // all form change event for checkbox radio selectbox elements
    var checkChangeElementInForm = (formId) => {
      const form = document.querySelector(formId);
      const changeEventCheckArr = ['checkbox', 'radio', 'select-one'];
      try{
        const allElm = Array.from(form.elements);
        allElm.map(elmList => {
          if (changeEventCheckArr.includes(elmList.type)) {
            elmList.addEventListener('change', getAllFormDataPush)
          }
        })
      }catch(e){
        console.log(e.message);
      }
      return form
    }

    // all form prevent
    allForm.map(formList => {
      formList.addEventListener('submit', function (e) { // event prevent
        e.preventDefault();
        console.log(this, '전송하려던 폼');
        getAllFormDataPush()
      })
      checkChangeElementInForm(`#${formList.id}`);
    })

  }
} // class




/**
 * 오버라이딩
 */


 /**
  * const pageForm = document.getElementById(config.formId);
      const tempElm = this.elt("div", {id: 'tempElm'});
      const hiddenInput = this.elt("input", {
        type: "text",
        name: "pageHiddenInput",
        value: config.curPage,
        hidden:true
      }) //FIXME: 여기서 변수를 선언하고

      pageForm.setAttribute('method', config.method); //FIXME: 여기서 갑자기 폼을 세팅해주고
      pageForm.after(tempElm);
      pageForm.appendChild(hiddenInput);

  */
 
class test extends mergeFormModule{
  constructor(config){
    super();

    this.pageForm = document.getElementById(config.formId);
    this.tempElm = this.elt("div", {id: 'tempElm'});
    this.hiddenInput = this.elt("input", {
    type: "text",
    name: "pageHiddenInput",
    value: config.curPage,
    hidden:true
  }) //FIXME: 여기서 변수를 선언하고

  this.setSetting(config)
  }

 setSetting(config){
  pageForm.setAttribute('method', config.method); //FIXME: 여기서 갑자기 폼을 세팅해주고
  pageForm.after(this.tempElm);
  pageForm.appendChild(hiddenInput);
 }
}


let pageConfig333 = {
  startPage: 1,
  endPage: 10,
  curPage: 1,
  curPageSet:1,
  totalPageSet:2,
  totalPage: 201,
  formId: "pageForm",
  action: '/info/client/245',
  method: "get",
  ajax: false,
  btnClass: "pageNum",
  prevArrowClass:"pagePrevArrow prev",
  nextArrowClass:"pagePrevArrow next",
  includesForm: ["#menuForm", '#langForm', '#sortForm']
}

let test1 = new test(pageConfig333);
// test1.setSetting()
console.dir(test1);


class test2{
  constructor(_type, _name, _value, _hidden) {
     this._type = _type;
     this._name = _name; 
     this._value = _value; 
     this._hidden = _hidden; 
    }


  pageForm = document.getElementById(config.formId);
  tempElm = this.elt("div", {id: 'tempElm'});
  hiddenInput = this.elt("input", {
  _type: this._type,
  _name: this._name,
  _value: this._value,
  _hidden:this._hidden
}) //FIXME: 여기서 변수를 선언하고

 setSetting(){
  pageForm.setAttribute('method', config.method); //FIXME: 여기서 갑자기 폼을 세팅해주고
  pageForm.after(tempElm);
  pageForm.appendChild(hiddenInput);
 }
}