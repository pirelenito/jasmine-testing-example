(function (global) {
  function Stock (params) {
    var params = params || {};
    this.symbol = params.symbol;
  };

  global.Stock = Stock;
})(this);