class FormComponent {
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
  
   getAttr(elm, attr) {
    return elm.getAttribute(attr)
  }

   rmAttr(elm, attr) {
    return elm.removeAttribute(attr)
  }

   setAttr(elm, attr) {
    const [at, val] = attr;
    return elm.setAttribute(at, val)
  }

  
   addClass(elm,action){
    return elm.classList.add(action)
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
  preventDefault(e) {
    e.preventDefault();
    let defaultWasPrevented = e.defaultPrevented;
    if (!defaultWasPrevented) { //  막혀있지 않으면.
    }
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




class FormConrtol extends FormComponent {
  constructor() {
    super();
    this.mergeIdx = 0;
  }

  include(config) {
    this.includesForm = config;
  }

  add(...config) {
    this.config = config;
    const main = this;

    for (let i = 0; i < config.length; i++) {
      
      const formInfo = config[i];
      const pageForm = document.getElementById(formInfo.formId);
      const tempElm = this.elt("div", {id: 'tempElm'});
      // const hiddenInput = this.elt("input", {type: "text",name: "pageHidden",value: formInfo.page,hidden: true})
      const btnClass = formInfo.btnClass ;
      const submitBtn = this.elt("button", {type: 'submit',hidden: true});
      const prevArrowClass = formInfo.prevArrowClass;
      const nextArrowClass = formInfo.nextArrowClass;

      // pageForm.appendChild(hiddenInput);
      pageForm.setAttribute('method', formInfo.method);
      pageForm.after(tempElm);

      let commonInfo = {
        main:main,
        formInfo:formInfo,
        // hiddenInput:hiddenInput,
        pageForm:pageForm,
        submitBtn:submitBtn
      }

      // paging button 생성
      if (formInfo.page > formInfo.endPage) {
        let prevBtn = pageBtnElt(commonInfo,prevArrowClass && prevArrowClass,'<')
        prevBtn.addEventListener('click', setForm(formInfo.startPage - 1,commonInfo))
        tempElm.append(prevBtn);
      }

      for (let j = formInfo.startPage; j < formInfo.startPage + formInfo.endPage; j++) {
        let postBtnElm  = pageBtnElt(commonInfo,btnClass && btnClass,String(j))
        if (j === formInfo.page) main.addClass(postBtnElm,'on'); // 현재 페이지 클래스 add on 
        postBtnElm.addEventListener('click', setForm(postBtnElm.textContent, commonInfo))
        tempElm.append(postBtnElm);
      }

      if (formInfo.pageSet !== formInfo.totalPageSet) {
        let nextBtn = pageBtnElt(commonInfo,nextArrowClass && nextArrowClass,'>')
        nextBtn.addEventListener('click', setForm(formInfo.endPage + 1,commonInfo))
        tempElm.append(nextBtn);
      }
      // pageForm.addEventListener('submit', main.preventDefault);
    }
    // function
    function pageBtnElt(commonInfo,condi,text){

      return commonInfo.main.elt("button",{
        type:"button",
        class: condi,
        [`data-form-name`]:commonInfo.formInfo.formId
      },text)
    }

    // 클릭시 페이지네이션 안에 히든 벨류 바꾸기 넣기.
    function setForm(data,  common) {
      return function(e){
        let clickBtn = this;
        clickBtn.setAttribute('value', data);
        // main.setAttr(common.hiddenInput, ['value', main.getAttr(clickBtn, 'value')]);
        main.setAttr(common.pageForm, ['action', `${common.formInfo.action}/${main.getAttr(clickBtn,'value')}`]);
        
        getInclufrsFormData(main.includesForm,clickBtn,common)
        main.getElm(`#${tempElm.id} button`).forEach(list => main.rmAttr(list, 'value')); // init

        common.submitBtn.click();
      }
    }

    function getInclufrsFormData(includesForm,clickButton,common) {
      if (!main.mergeIdx) { //안에 초기화하고  // 머지폼이 없을때 들어옴
        let getIncludeForms = (main.nullCheck(includesForm)) ? includesForm : 0;
        if (getIncludeForms.length) { // exist includesForm.
          let crtHiddenInput = main.elt('input', {
            type: "text",
            value: clickButton.getAttribute('value'),
            name: "pageHidden",
            [`data-form-name`]:clickButton.getAttribute('data-form-name')
            // hidden: true
          });
          common.pageForm.innerHTML = '';// 페이지네이션 폼 초기화 후 클릭한 버튼 넣어주기
          common.pageForm.appendChild(crtHiddenInput);
          common.pageForm.appendChild(common.submitBtn);

          // 인클루드된 폼들 추려서 어팬드
          getIncludeForms.map(formList => {
            if (main.nullCheck(main.getExistElmInForm(formList))) {
              main.getExistElmInForm(formList).forEach(elmList => {
                let tempElm = main.getCloneNode(elmList);
                // setAttr(tempElm, ['hidden', true])
                common.pageForm.appendChild(tempElm);
              })
            }
          })
        }
      }
    }
  }

  mergeForm() {

  }
}


