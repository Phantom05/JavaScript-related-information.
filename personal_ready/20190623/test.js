function Person(name) {
  this.name = name;
}
Person.prototype.handleEvent = function () {
  console.log(`Hello! ${this.name}`);
}

var person = new Person('Tom');
var button = document.getElementById('button');

button.addEventListener('click', {
  handleEvent: function (e, t) {
    console.log(this);
    console.log(this.wow);
  },
  wow: '22'
}, false);



class Module {
  constructor() {}
  ArrayFrom(target) {
    return Array.prototype.slice.call(target, 0)
  }
  querySeletor(attr) {
    return document.querySelector(attr)
  }
  querySeletorAll(attr) {
    return ArrayFrom(document.querySelectorAll(attr))
  }
  doAxios(config) {
    return axios(config).then((data) => data).catch(err => err)
  }

}

class somePage extends Module {
  constructor() {
    super();
    this.init();
  }

  async init() {
    await this.setVars();
    await this.setData();
    await this.views();
    await this.setEvents();
  }

  setVars() {
    this.box = this.querySeletor('#box')
    this.box2 = this.querySeletor('#box2')
    this.res = this.querySeletor('#res')
    this.res2 = this.querySeletor('#res2')
  }

  async setData() {

    this.setData.elGetData = async () =>{
      let axiosConfig = {
        method: "GET",
        url: "https://api.bithumb.com/public/ticker/BTC"
      }
      return await this.doAxios(axiosConfig);
    }

  }

  setEvents() {
    this.box.addEventListener('click', this.views.changeBgColor('red').bind(this), false);
    this.res.addEventListener('DOMSubtreeModified', this.views.alertFn, false);
  }

  views() {
    const views = this.views;

    views.changeBgColor = function(color) {
      return async function (e) {
        let getData = await this.setData.elGetData();
        this.res.innerHTML = getData.status;
      }
    }
    views.alertFn = function() {
      console.log('alert!!');
    }

  }

}

let somepage = new somePage();
console.dir(somepage)
