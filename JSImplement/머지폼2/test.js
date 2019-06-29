function setForm(common, type) {
  return function (e) {

    if (type == "submit") {
      const clickBtn = this;
      main.setAttr(common.pageForm, ['action', `${common.formInfo.action}/${main.getAttr(clickBtn,'value')}`]);
      // getIncludeFormData(clickBtn, common);
      const includesForm = main.modules[`#${common.pageForm.id}`];
      const getIncludeForms = includesForm && includesForm;

      if (!main.mergeIdx) { //get in, if exist to includeForm. but if exist method mergeForm not in
        // get input and pageForm append for includes form 
        let crtHiddenInput = main.elt('input', {
          type: "text",
          value: common.formInfo.page,
          name: main.pageHiddenName,
          [`data-form-name`]: common.formInfo.formId,
          // hidden: true
        });

        if (clickBtn) {
          main.setAttr(crtHiddenInput, ['value', main.getAttr(clickBtn, "value")])
          main.setAttr(crtHiddenInput, ['data-form-name', main.getAttr(clickBtn, "data-form-name")])
        }
        common.pageForm.innerHTML = ''; // pageForm init and append hidden input
        common.pageForm.append(crtHiddenInput, common.submitBtn);
        let commonForms = common.formInfo.commonForms;
        if (commonForms) {
          main.getCommonFormData(main, common.pageForm, commonForms)
        }
        // common.pageForm.append(main.getCommonFormData(common.formInfo.commonForms))
        if (getIncludeForms) { // exist includesForm.
          main.getCommonFormData(main, common.pageForm, getIncludeForms)
        }

      }
      common.submitBtn.click();
    } else if (type == "change") {
      const pageForm = common.pageForm;
      const formId = pageForm && pageForm.id;
      const tarForm = main.getElm(`#${formId}`);

      let crtHiddenInput = main.elt('input', {
        type: "text",
        value: common.formInfo.page,
        name: main.pageHiddenName,
        [`data-form-name`]: common.formInfo.formId,
        // hidden: true
      });

      const hiddenInput = main.getCloneNode(tarForm[main.pageHiddenName]);
      const hiddenSubmitBtn = main.getCloneNode(tarForm.getElementsByTagName('button')[0]);

      tarForm.innerHTML = "";
      tarForm.append(hiddenInput, hiddenSubmitBtn);

      if (main.isObject(realTimeType)) {
        main.setAttr(tarForm, ['action', `${realTimeType.action}/${main.getAttr(hiddenInput,'value')}`]);
      }

      let commonForms = common.formInfo.commonForms;

      if (commonForms) main.getCommonFormData(main, tarForm, commonForms);
      main.getCommonFormData(main, tarForm, formIncludeForms)

      hiddenSubmitBtn.click();
    }
  }
}