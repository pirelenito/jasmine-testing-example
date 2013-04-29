(function (global, Backbone) {

  var Stock = Backbone.Model.extend({
    idAttribute: 'symbol',
    urlRoot: '/stocks'
  });

  global.Stock = Stock;

})(this, Backbone);