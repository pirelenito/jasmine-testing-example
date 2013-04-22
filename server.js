var express = require('express');
var request = require('request');

var app = express();

app.get('/stocks/:symbol', function (request, response) {
  fetchYahooFinance(request.params.symbol, function (data) {
    response.setHeader('Content-Type', 'application/json');
    response.send({
      sharePrice: data.query.results.quote.Ask
    });
  });
});

function fetchYahooFinance (symbol, callback) {
  var query = 'select Ask ' +
              'from yahoo.finance.quotes ' +
              'where symbol=\'' + symbol + '\'';

  request({
    uri: 'http://query.yahooapis.com/v1/public/yql',
    method: 'GET',
    qs: {
      format: 'json',
      env: 'http://datatables.org/alltables.env',
      q: query
    }
  }, function(_, _, body) {
    callback(JSON.parse(body));
  });
}

// Static server to run the specs
app.use(express.static(__dirname));

app.listen(8000);