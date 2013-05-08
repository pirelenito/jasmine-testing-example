var express = require('express');
var app = express();

app.get('/stocks', function (req, res) {
  var ids = req.query.ids || [];

  var stocks = ids.map(function (value) {
    return { symbol: value, sharePrice: 20.18 };
  }, this)

  res.setHeader('Content-Type', 'application/json');
  res.send(stocks);
});

app.get('/stocks/:symbol', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send({ sharePrice: 20.18 });
});

app.use(express.static(__dirname));

app.listen(8000);