














const pageConfig1 = {
  startPage: 1,
  endPage: 10,
  page: 6,
  pageSet: 1,
  totalPageSet: 2,
  totalPage: 201,
  formId: "#pageNationForm1",
  action: '/auth/api/test/134',
  method: "get",
  ajax: false,
  btnClass: "pageNum",
  prevArrowClass: "pagePrevArrow prev",
  nextArrowClass: "pagePrevArrow next",
  includeForms:['#langForm'],
  realTime:true,
  commonForms:['#sortForm']
}
const pageConfig2 = {
  startPage: 1,
  endPage: 10,
  page: 6,
  pageSet: 1,
  totalPageSet: 2,
  totalPage: 201,
  formId: "#pageNationForm2",
  action: '/info/client/242',
  method: "get",
  ajax: false,
  btnClass: "pageNum",
  prevArrowClass: "pagePrevArrow prev",
  nextArrowClass: "pagePrevArrow next",
  includeForms:[],
  realTime:true,
  commonForms:['#sortForm']
}
const pageConfig3 = {
  startPage: 1,
  endPage: 10,
  page: 6,
  pageSet: 1,
  totalPageSet: 2,
  totalPage: 201,
  formId: "#pageNationForm3",
  action: '/info/client/242',
  method: "get",
  ajax: false,
  btnClass: "pageNum",
  prevArrowClass: "pagePrevArrow prev",
  nextArrowClass: "pagePrevArrow next",
  includeForms:[],
  commonForms:['#sortForm'],
  realTime:true
}
const pageConfig4 = {
  startPage: 1,
  endPage: 10,
  page: 6,
  pageSet: 1,
  totalPageSet: 2,
  totalPage: 201,
  formId: "#pageNationForm4",
  action: '/info/client/242',
  method: "get",
  ajax: false,
  btnClass: "pageNum",
  prevArrowClass: "pagePrevArrow prev",
  nextArrowClass: "pagePrevArrow next",
}
const formModule = new FormModule();

formModule.add(pageConfig1,pageConfig2,pageConfig3,pageConfig4);
formModule.prevent()