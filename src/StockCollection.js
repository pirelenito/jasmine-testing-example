(function (global, Backbone) {

  var StockCollection = Backbone.Collection.extend({
    model: Stock
  });

  global.StockCollection = StockCollection;

})(this, Backbone);