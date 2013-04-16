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
    var query = 'select Ask ' +
                'from yahoo.finance.quotes ' +
                'where symbol=\'' + that.symbol + '\'';

    $.ajax({
      url: 'http://query.yahooapis.com/v1/public/yql',
      dataType: 'jsonp',
      data: {
        format: 'json',
        env: 'http://datatables.org/alltables.env',
        q: query
      },
      success: function (data) {
        console.log(data)
        that.sharePrice = parseFloat(data.query.results.quote.Ask);
        success(that);
      }
    });
  };

  global.Stock = Stock;
})(this);