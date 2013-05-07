(function (global, Backbone) {

  var Stock = Backbone.Model.extend({
    idAttribute: 'symbol',
    urlRoot: '/stocks',

    defaults: {
      'sharePrice': 0
    }
  });

  global.Stock = Stock;

})(this, Backbone);