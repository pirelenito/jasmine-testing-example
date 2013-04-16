var express = require('express');
var request = require('request');
var app = express();

// to run the specs
app.use(express.static(__dirname));

app.get('/stocks/:symbol', function (req, res) {
  var symbol = req.params.symbol;
  var query = 'select Ask ' +
                'from yahoo.finance.quotes ' +
                'where symbol=\'' + symbol + '\'';

  res.setHeader('Content-Type', 'application/json');

  request({
    uri: 'http://query.yahooapis.com/v1/public/yql',
    method: 'GET',
    qs: {
      format: 'json',
      env: 'http://datatables.org/alltables.env',
      q: query
    }
  }, function(error, response, body) {
    res.send(response.body)
  })
})

app.listen(8000);