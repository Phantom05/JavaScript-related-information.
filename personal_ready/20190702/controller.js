
(function(exports){
  function SpinboxController(){
    
    this.spinboxModel = new SpinboxModel();
    this.spinboxView= new SpinboxView();

    this.spinboxView.render(this.spinboxModel.getData());

<<<<<<< HEAD
=======
 
>>>>>>> 9c88a8d13449775cbb808b147e678036cb1f848c
    $('.btn-increase').on("click", $.proxy(this.onClickIncrease, this));
    $('.btn-decrease').on("click", $.proxy(this.onClickDecrease, this));
  }
 
  SpinboxController.prototype = {
    onClickIncrease:function(){
      this.spinboxModel.increase();
      this.spinboxView.render(this.spinboxModel.getData());
    },
    onClickDecrease:function(){
      this.spinboxModel.decrease();
      this.spinboxView.render(this.spinboxModel.getData());
    }
  };
  exports.SpinboxController = SpinboxController;
})(this)