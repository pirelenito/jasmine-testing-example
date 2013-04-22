(function (global) {
  function Stock (params) {
    var params = params || {};
    this.symbol = params.symbol;
    this.sharePrice = params.sharePrice;
  };

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