(function (global) {
  var Stock = Backbone.Model.extend();

  Stock.prototype.fetch = function(params) {
    var that = this;
    var params = params || {};
    var success = params.success || function () {}
    var url = 'http://0.0.0.0:8000/stocks/'+that.symbol;

    $.getJSON(url, function (data) {
      that.sharePrice = data.sharePrice;
      success(that);
    });
  };

  global.Stock = Stock;
})(this);