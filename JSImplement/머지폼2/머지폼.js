class FormComponent {
  constructor() {

  }

  isObject(obj) {
    return (typeof obj === "object" && obj !== null) && !Array.isArray(obj) || typeof obj === "function";
  }

  getConstructorName(obj) {
    return (obj.constructor && obj.constructor.name) ? obj.constructor.name : "";
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

  addEvent(elm, action, f) {
    elm.addEventListener(action, f)
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

  addClass(elm, action) {
    return elm.classList.add(action)
  }

  getCloneNode(elm) {
    const arr = Array.from(elm).map(list =>list.cloneNode(true))
    return  (arr.length >1)?arr:arr[0]
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

  // 가져올 폼 attr
  getExistElmInForm(formAttr) { // NOTE: 이건됬음.
    const form = document.querySelector(formAttr);
    const checkArr = ['checkbox', 'radio'];
    const valueArr = ['text', 'search'];
    const elmArr = [];
    const formChildren = Array.from(form.elements);
    const formId = form.id;

    function setMergeAttr(target) {
      return target.setAttribute('data-merge-target-form', formId)
    }
    formChildren.map(childList => {
      const childNodeName = childList.nodeName;
      const formObj = {
        setAttrPush: function (bool) {
          if (bool) {
            setMergeAttr(childList);
            elmArr.push(childList);
          }
        },
        setAttr: function (bool) {
          if (bool) setMergeAttr(childList);
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

  // 생성된 메서드 this. append할 form, includeForms
  getCommonFormData(main, pageForm, includeForms,type) {
   if(type === "common"){
     console.log(includeForms,'includeForms');
   }
    includeForms.map(formList => {
      const getElmList = main.getExistElmInForm(formList);
      if (main.nullCheck(getElmList)) {
        // console.log(getElmList);
        getElmList.map(elmList => {
          const tempElm = main.getCloneNode(elmList);
          // main.setAttr(tempElm, ['hidden', true]);
          pageForm.append(tempElm);
        })
      }
    })
  }
}



class FormModule extends FormComponent {
  constructor() {
    super();
    this.mergeIdx = 0;
    this.pageHiddenName = "pageHidden";
    this.modules = {};
    this.commonIdx = 0;
  }

  setForm(common, type) { // all forms data push for mergeForm
    const main = this;
    return function (e) {
      
      const tarForm = common.pageForm;
      const includesForm = main.modules[`#${tarForm.id}`];
      const realTimeType = common.formInfo.realTime;
      const getIncludeForms = main.nullCheck(includesForm) && includesForm;

      if (!main.mergeIdx) {} //get in, if exist to includeForm. but if exist method mergeForm not in
      if (type == "submit") {
        const clickBtn = this;
        main.setAttr(tarForm, ['action', `${common.formInfo.action}/${main.getAttr(clickBtn,'value')}`]);
        const hiddenInput = main.elt('input', { // get input and pageForm append for includes form 
          type: "text",
          value: common.formInfo.page,
          name: main.pageHiddenName,
          [`data-form-name`]: common.formInfo.formId,
          // hidden: true
        });

        if (clickBtn) {
          main.setAttr(hiddenInput, ['value', main.getAttr(clickBtn, "value")])
          main.setAttr(hiddenInput, ['data-form-name', main.getAttr(clickBtn, "data-form-name")])
        }
        commonForms(hiddenInput, common.submitBtn); // exist includesForm.

      } else if (type == "change") {
        const hiddenInput = main.getCloneNode(tarForm[main.pageHiddenName]); // get input and pageForm append for includes form 
        const hiddenSubmitBtn = main.getCloneNode(tarForm.getElementsByTagName('button')[0]);
        commonForms(hiddenInput,hiddenSubmitBtn);
      }

      function commonForms(hiddenInput,submitBtn) { // pageForm init and children elm insert
        if (main.isObject(realTimeType)) {
          main.setAttr(tarForm, ['action', `${realTimeType.action}/${main.getAttr(hiddenInput,'value')}`]);
        }
        tarForm.innerHTML = '';
        let commonForms = common.formInfo.commonForms;
        if (commonForms) main.getCommonFormData(main, tarForm, commonForms,'common');
        if (getIncludeForms) main.getCommonFormData(main, tarForm, getIncludeForms);
        tarForm.append(hiddenInput, submitBtn); // append hidden input
        submitBtn.click()

      }
    }
  }

  realTime(config) {
    this.checkChangeForm(config)
  }

  checkChangeForm(config) {
    const [main, common] = [this, config]
    const formIncludeForms = common.main.modules[`#${config.pageForm.id}`];
    const changeEventCheckArr = ['checkbox', 'radio', 'select-one'];
    const commomForms = common.formInfo.commonForms;
    const getCommomForms = main.nullCheck(commomForms) && commomForms;

    controlChangeFn(formIncludeForms);
    if(getCommomForms) controlChangeFn(getCommomForms);
      
    function controlChangeFn(forms){
      forms.map(list=>{
        const form = main.getElm(list);
        checkChangeElementStateInForm(`#${form.id}`);
      })
    }
    // all form change event for checkbox radio selectbox elements
    function checkChangeElementStateInForm(formId) {
      const form = document.querySelector(formId);
      const allElm = Array.from(form.elements);
      
      form.addEventListener('submit',function(e){
        e.preventDefault();
        main.setForm(common, 'change')()
      })
      allElm.map(elmList => {
        if (changeEventCheckArr.includes(elmList.type)) {
          elmList.addEventListener('change', main.setForm(common, 'change'))
        }
      })
    }
  
  }

  add(...config) {
    this.config = config;
    const main = this;
    

    for (let i = 0; i < config.length; i++) {
      const formInfo = config[i];
      const pageForm =main.getElm(formInfo.formId);
      const tempElm = main.elt("div", {id: `${formInfo.formId}Temp`});
      const submitBtn = main.elt("button", {type: 'submit',hidden: true}, '전송');
      const {prevArrowClass, nextArrowClass, includeForms, btnClass} = formInfo;
      const realTimeType = formInfo.realTime;
      const defaultHiddenInput = main.elt("input", {
        type: "text",
        name: main.pageHiddenName,
        value: formInfo.page,
        [`data-form-name`]: formInfo.formId,
        hidden:true
      })
      const commonInfo = {
        main: main,
        formInfo: formInfo,
        pageForm: pageForm,
        submitBtn: submitBtn,
        tempElm: tempElm
      }

      pageForm.setAttribute("action", formInfo.action)
      pageForm.setAttribute('method', formInfo.method);
      pageForm.after(tempElm);
      pageForm.append(defaultHiddenInput, submitBtn);

      if (includeForms && includeForms) main.modules[formInfo.formId] = includeForms;
      if (realTimeType && includeForms) main.realTime(commonInfo);

      // paging button 생성
      if (formInfo.page > formInfo.endPage) {
        makeBtnset(prevArrowClass && prevArrowClass, '<', formInfo.startPage - 1)
      }
      for (let j = formInfo.startPage; j < formInfo.startPage + formInfo.endPage; j++) {
        makeBtnset(btnClass && btnClass, String(j), j, 'arrow')
      }
      if (formInfo.pageSet !== formInfo.totalPageSet) {
        makeBtnset(nextArrowClass && nextArrowClass, '>', formInfo.endPage + 1);
      }

      function makeBtnset(condi, txt, val, type) {
        const btn = pageBtnElt(commonInfo, condi, txt, val)
        if (val === formInfo.page) main.addClass(btn, 'on');
        main.addEvent(btn, 'click', main.setForm(commonInfo, 'submit'))
        tempElm.append(btn);
      }
    }
    // function
    function pageBtnElt(commonInfo, condi, text, val) {
      return commonInfo.main.elt("button", {
        type: "button",
        class: condi,
        [`data-form-name`]: commonInfo.formInfo.formId,
        value: val
      }, text)
    }
  }

  prevent() {
    const main = this;
    Array.from(document.querySelectorAll('form')).map(list => {
      list.addEventListener('submit', main.preventDefault)
    })
  }

  getAllElementFromIncludeForms(config){
    const main = this;
    const includeForms = main.nullCheck(config.includeForms) && config.includeForms;
    const getElmArr = includeForms.map(list=>{
      const form = main.getElm(list);
      return main.getCloneNode(main.getExistElmInForm(`#${form.id}`))
    })
    return getElmArr

  }

  doInsertElm(formId,elm){
    const main = this;
    const form = main.getElm(formId);
    const elmList = Array.from(elm);
    const oneArr = elmList.filter(list=> !Array.isArray(list));
    // elmList.filter(list=> Array.isArray(list)).map(list=> {
    //   list.map(x=>oneArr.push(x))
    // })

    console.log(elmList);
    // const newArr = [];
    // elmList.map(list => {
    //   (!Array.isArray(list))?newArr.push : list.map(x=>newArr.push(x))
    // })
    // console.log(newArr);

    console.log(
      elmList.flat()
    );

    console.log(
      // oneArr
    );
    // form.append(Array.from(elm))
  }

  mergeForm(config) {
    this.mergeIdx = 1;
    const main = this
    const allForm = main.getElm('[data-merge-form="true"]');
    
    const hiddenBtn = main.elt("input",{
      type:"submit",
      // hidden:true
    })
    const mergeForm = main.elt("form", {
      id: config.formId,
      method: config.method,
      action: config.action,
      // hidden:true
    },hiddenBtn);

    document.body.appendChild(mergeForm); // form 생성


    const getElmArr = main.getAllElementFromIncludeForms(config)
    main.doInsertElm(`#${config.formId}`,getElmArr)


  
    // all forms data push for mergeForm
    // function getAllFormDataPush() {
    //   let mergeFormBtn = main.elt("input", {
    //     type: "submit",
    //     name: "mergeFormBtn"
    //   })
    //   mergeForm.innerHTML = '';

    //   allForm.map(mergeList => {
    //       let getElmListFromForm = main.getExistElmInForm(`#${mergeList.id}`);
    //       if (getElmListFromForm) {
    //         getElmListFromForm.map(elmList => {
    //           if (elmList.name == 'pageHiddenInput') mergeForm.action = `${config.action}/${elmList.getAttribute('value')}`

    //           let tempElm = main.getCloneNode(elmList)
    //           tempElm.setAttribute('hidden', true);
    //           mergeForm.appendChild(tempElm)
    //         })
    //       }
    //     }) /
    //     // 각폼들 전송시 머지폼 전송
    //     mergeForm.appendChild(mergeFormBtn);
    //   mergeFormBtn.click();
    // }

    // all form change event for checkbox radio selectbox elements
    // var checkChangeElementInForm = (formId) => {
    //   const form = document.querySelector(formId);
    //   const changeEventCheckArr = ['checkbox', 'radio', 'select-one'];
    //   try {
    //     const allElm = Array.from(form.elements);
    //     allElm.map(elmList => {
    //       if (changeEventCheckArr.includes(elmList.type)) {
    //         elmList.addEventListener('change', getAllFormDataPush)
    //       }
    //     })
    //   } catch (e) {
    //     console.log(e.message);
    //   }
    //   return form
    // }

    // all form prevent and 전송 시 머지폼으로 데이터 모아서 전송
    // allForm.map(formList => {
    //   formList.addEventListener('submit', function (e) { // event prevent
    //     e.preventDefault();
    //     console.log(this, '전송하려던 폼');
    //     getAllFormDataPush()
    //   })
    //   checkChangeElementInForm(`#${formList.id}`);
    // })
    //  // temp event prevent
    //  mergeForm.addEventListener('submit', function (e) {
    //   // e.preventDefault();
    // })

  }

}
