class FormComponent {
  constructor() {

  }

  
 isObject(obj) {
  return (typeof obj === "object" && obj !== null) && !Array.isArray(obj)  || typeof obj === "function" ;
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
  
  addEvent(elm,action,f){
    elm.addEventListener(action,f)
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
        setAttrPush: function (bool) {
          if (bool) {
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




class FormModule extends FormComponent {
  constructor() {
    super();
    this.mergeIdx = 0;
    this.pageHiddenName =  "pageHidden",
    this.modules={};
    this.commonIdx = 0;
  }



  common(config){
    this.commonIdx = 1;
    // const main = this;
    // console.log(config);
    // pageForm
    // const formIncludeForms = config
    // realTimeType = false;

    // const common = {};
    // [common.main, common.formInfo,common.commonForm] = [main,{realTime : true},config]
    // // common.pageFormId
    // console.log(common,'common');
    // for(var list in  main.modules){
    //   console.log(list);
    //   common.pageForm = main.getElm(list);
    //   this.checkChangeForm(common,true)
    // }




    const main = this;
    const common = config;
    const formIncludeForms = [config];
   
    // all forms data push for mergeForm
    function getAllFormDataPush(form,init) {
      return function(e){
        if(config){

          for(var pageNameList in main.modules){
            const pageForm = main.getElm(pageNameList);
            const formId = pageForm && pageForm.id;
            const tarForm = main.getElm(`#${formId}`);
            const hiddenInput = main.getCloneNode(tarForm[main.pageHiddenName]);
            const hiddenSubmitBtn = main.getCloneNode(tarForm.getElementsByTagName('button')[0]);
    
            tarForm.innerHTML="";
            tarForm.append(hiddenInput,hiddenSubmitBtn);
    
            formIncludeForms.map(formListId => {
              const getElmListFromForm = main.getExistElmInForm(`${formListId}`);
              if (getElmListFromForm) {
                getElmListFromForm.map(elmList => {
                  const tempElm = main.getCloneNode(elmList);
                  tarForm.append(tempElm);
                })
              }
            }) 
          }
        }
      }
    }

    // default insert and all form change event for checkbox radio selectbox elements
    function formControl(config,type){
      const form = document.querySelector(config);
      const changeEventCheckArr = ['checkbox', 'radio', 'select-one'];
      const allElm = Array.from(form.elements);
      allElm.map(elmList => {
        if (changeEventCheckArr.includes(elmList.type)) {
          if(type =="check"){
            elmList.addEventListener('change', getAllFormDataPush(form))
          }else{
            getAllFormDataPush(form,true)()
          }
          
        }
      })
      return form
    }
    if(!this.mergeIdx){ // 머지폼이 없을때
      console.log('common!');
      formControl(config)
      formIncludeForms.map(list=>{
        const form = main.getElm(list);
        formControl(`#${form.id}`,'check');
      })
    }else{ // 머지폼이 있을때
      console.log('merge');
    }



  }

  realTime(config){
    this.checkChangeForm(config)
  }

  checkChangeForm(config,setCommon){
    const main = this;
    const common = config;
    const realTimeType = common.formInfo.realTime;
    const formIncludeForms = (setCommon)? [config.commonForm]:common.main.modules[`#${config.pageForm.id}`];

   
    // all forms data push for mergeForm
    function getAllFormDataPush(form) {
      return function(e){
        const pageForm = common.pageForm;
        console.log(pageForm,'pageForm');
        const formId = pageForm && pageForm.id;
        const tarForm = main.getElm(`#${formId}`);
        const hiddenInput = main.getCloneNode(tarForm[main.pageHiddenName]);
        const hiddenSubmitBtn = main.getCloneNode(tarForm.getElementsByTagName('button')[0]);

        tarForm.innerHTML="";
        tarForm.append(hiddenInput,hiddenSubmitBtn);
        if(main.isObject(realTimeType)){
          main.setAttr(tarForm,['action',`${realTimeType.action}/${main.getAttr(hiddenInput,'value')}`]);
        }
        formIncludeForms.map(formListId => {
          const getElmListFromForm = main.getExistElmInForm(`${formListId}`);
          if (getElmListFromForm) {
            getElmListFromForm.map(elmList => {
              const tempElm = main.getCloneNode(elmList);
              tarForm.append(tempElm);
            })
          }
        }) 
        hiddenSubmitBtn.click();
      }
    }

    // all form change event for checkbox radio selectbox elements
    function checkChangeElementInForm(formId) {
      const form = document.querySelector(formId);
      const changeEventCheckArr = ['checkbox', 'radio', 'select-one'];
      const allElm = Array.from(form.elements);
      allElm.map(elmList => {
        if (changeEventCheckArr.includes(elmList.type)) {
          elmList.addEventListener('change', getAllFormDataPush(form))
        }
      })
      return form
    }

    if(!this.mergeIdx){ // 머지폼이 없을때
      console.log('not mergeForm');
      formIncludeForms.map(list=>{
        const form = main.getElm(list);
        checkChangeElementInForm(`#${form.id}`);
      })

    }else{ // 머지폼이 있을때
      console.log('merge');
    }
  }

  add(...config) {
    this.config = config;
    const main = this;

    for (let i = 0; i < config.length; i++) {
      const formInfo = config[i];
      const pageForm = document.querySelector(formInfo.formId);
      const tempElm = main.elt("div", {id: `${formInfo.formId}Temp`});
      const btnClass = formInfo.btnClass ;
      const submitBtn = main.elt("button", {type: 'submit',
      // hidden: true
    },'전송');
      const prevArrowClass = formInfo.prevArrowClass;
      const nextArrowClass = formInfo.nextArrowClass;
      const includeForms = formInfo.includeForms;
      const realTimeType = formInfo.realTime;
      const defaultHiddenInput = main.elt("input",{
        type:"text",
        name:main.pageHiddenName,
        value:formInfo.page,
        [`data-form-name`]:formInfo.formId
      })
      const commonInfo = {
        main:main,
        formInfo:formInfo,
        pageForm:pageForm,
        submitBtn:submitBtn,
        tempElm:tempElm
      }

      pageForm.setAttribute("action",formInfo.action)
      pageForm.setAttribute('method', formInfo.method);
      pageForm.after(tempElm);
      pageForm.append(defaultHiddenInput,submitBtn);


      if(includeForms && includeForms) main.modules[formInfo.formId] = includeForms;
      if(realTimeType && includeForms) main.realTime(commonInfo);

      // paging button 생성
      if (formInfo.page > formInfo.endPage) {
        makeBtnset(prevArrowClass && prevArrowClass,'<',formInfo.startPage - 1)
      }

      for (let j = formInfo.startPage; j < formInfo.startPage + formInfo.endPage; j++) {
        makeBtnset(btnClass && btnClass,String(j) ,j,'arrow')
      }

      if (formInfo.pageSet !== formInfo.totalPageSet) {
        makeBtnset(nextArrowClass && nextArrowClass,'>',formInfo.endPage + 1);
      }

      function makeBtnset(condi,txt,val,type){
        const btn = pageBtnElt(commonInfo,condi,txt,val)
        if (val === formInfo.page) main.addClass(btn,'on');
          main.addEvent(btn, 'click' ,setForm(val,commonInfo))
          tempElm.append(btn);
      }
      getIncludeFormData(null,commonInfo) // default get IncludeForms data
      // main.addEvent(pageForm,'submit',main.preventDefault)
    }
    // function
    function pageBtnElt(commonInfo,condi,text,val){
      return commonInfo.main.elt("button",{
        type:"button",
        class: condi,
        [`data-form-name`]:commonInfo.formInfo.formId,
        value:val
      },text)
    }

    function setForm(data,  common) {
      return function(e){
        const clickBtn = this;
        main.setAttr(common.pageForm, ['action', `${common.formInfo.action}/${main.getAttr(clickBtn,'value')}`]);
        getIncludeFormData(clickBtn,common);
        // exist realtile bool is true and includesForms
        common.submitBtn.click();
      }
    }

    function getIncludeFormData(clickButton,common) {

      const includesForm = main.modules[`#${common.pageForm.id}`];
      const getIncludeForms = includesForm && includesForm;
      if (!main.mergeIdx) { //get in, if exist to includeForm. but if exist method mergeForm not in
        // get input and pageForm append for includes form 
        let crtHiddenInput = main.elt('input', {
          type: "text",
          value: common.formInfo.page,
          name: main.pageHiddenName,
          [`data-form-name`]:common.formInfo.formId,
          // hidden: true
        });

        if(clickButton){
          main.setAttr(crtHiddenInput,['value',main.getAttr(clickButton,"value")])
          main.setAttr(crtHiddenInput,['data-form-name',main.getAttr(clickButton,"data-form-name")])
        }
        common.pageForm.innerHTML = '';// pageForm init and append hidden input
        common.pageForm.appendChild(crtHiddenInput);
        
        if (getIncludeForms) {// exist includesForm.
          getIncludeForms.map(formList => {
            const getElmList = main.getExistElmInForm(formList);

            if (main.nullCheck(getElmList)) {
              getElmList.map(elmList => {
                const tempElm = main.getCloneNode(elmList);
                // main.setAttr(tempElm, ['hidden', true]);
                common.pageForm.appendChild(tempElm);
              })
            }
          })
        }
        common.pageForm.appendChild(common.submitBtn);
      }
    }
  }

  prevent(){
    const main =this;
    Array.from(document.querySelectorAll('form')).map(list=>{
      list.addEventListener('submit',main.preventDefault)
    })
  }

  mergeForm(config) {
    this.mergeIdx = 1;
    let allForm = Array.from(document.querySelectorAll('[data-merge-form="true"]'));
    // 머지폼 할때 어차피 data-merge-form으로 잡기때문에 머지폼 안할껀 그냥 폼에다가 넣지 않으면 됨.
    let main = this;

    // create mergeform
    let mergeForm = this.elt("form", {
      id: 'mergeForm',
      method: config.method,
      action: config.action,
      // hidden:true
    });
    document.body.appendChild(mergeForm); // form 생성

    // temp event prevent
    mergeForm.addEventListener('submit', function (e) {
      // e.preventDefault();
    })

    // all forms data push for mergeForm
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
              if (elmList.name == 'pageHiddenInput') mergeForm.action = `${config.action}/${elmList.getAttribute('value')}`

              let tempElm = main.getCloneNode(elmList)
              tempElm.setAttribute('hidden', true);
              mergeForm.appendChild(tempElm)
            })
          }
        }) /
        // 각폼들 전송시 머지폼 전송
        mergeForm.appendChild(mergeFormBtn);
      mergeFormBtn.click();
    }

    // all form change event for checkbox radio selectbox elements
    var checkChangeElementInForm = (formId) => {
      const form = document.querySelector(formId);
      const changeEventCheckArr = ['checkbox', 'radio', 'select-one'];
      try {
        const allElm = Array.from(form.elements);
        allElm.map(elmList => {
          if (changeEventCheckArr.includes(elmList.type)) {
            elmList.addEventListener('change', getAllFormDataPush)
          }
        })
      } catch (e) {
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

}


