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

class pageNation extends mergeFormModule{
  constructor() {
    super();
    this.mergeIdx = 1;
    this.init();
  }
  async init() {
    
    await this.setVars();

  }


  setVars(){
    // this.pageForm = document.getElementById(config.formId);
  }


  setPageNation(config) {

    if (config.ajax) {

    } else {

      const pageForm = document.getElementById(config.formId);
      const tempElm = this.elt("div", {id: 'tempElm'});
      const hiddenInput = this.elt("input", {
        type: "text",
        name: "pageHiddenInput",
        value: config.curPage,
        // hidden:true
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
              // hidden:true
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

}



class mergeForm extends mergeFormModule {
  constructor() {
    super();
    console.dir(pageNation);
    
    this.init();
  }
  async init() {
    this.mergeIdx = 1;
    // await this.setVars();
  }
  // setVars(){
  //   this.pageForm = document.getElementById(config.formId);
  // }


  /**
   * 
   * @param {*} config 
   */
 
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
      e.preventDefault();
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
            // tempElm.setAttribute('hidden', true);
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



