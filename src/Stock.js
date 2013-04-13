(function (global) {
  function Stock (params) {
    var params = params || {};
    this.symbol = params.symbol;
  };

  Stock.prototype = {
    fetch: function () {
      var that = this;

      queryYahooFinance({
        symbol: that.symbol,
        success: function (stock) {
          that.sharePrice = stock.sharePrice;
          that.change = stock.change;
        }
      });
    }
  }

  function queryYahooFinance(params) {
    var that = this;
    var symbol = params.symbol;
    var success = params.success;
    var query = 'select Ask, Change from yahoo.finance.quotes where symbol in (\''+symbol+'\')';

    $.ajax({
      url: 'http://query.yahooapis.com/v1/public/yql',
      dataType: 'jsonp',
      data: {
        format: 'json',
        env: 'http://datatables.org/alltables.env',
        q: query
      },
      success: function (data) {
        success(parseStockData(data));
      }
    });
  }

  function parseStockData (data) {
    return {
      sharePrice: parseFloat(data.query.results.quote.Ask, 10),
      change: parseFloat(data.query.results.quote.Change, 10)
    }
  }

  global.Stock = Stock;
})(this);