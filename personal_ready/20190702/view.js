(function(exports){
  function SpinboxView(){

  }
  SpinboxView.prototype={
    render:function(value){
      $('.result').val(value)
    }
  }
  exports.SpinboxView = SpinboxView;
})(this)