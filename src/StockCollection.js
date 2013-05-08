(function (global, Backbone, $) {

  var StockCollection = Backbone.Collection.extend({
    model: Stock,
    url: function () {
      return "/stocks" + queryString(modelIds.call(this));
    }
  });

  function modelIds () {
    return this.map(function (model) {
      return model.id;
    })
  }

  function queryString (ids) {
    if (ids.length === 0) { return ''; }
    return '?' + $.param({
      ids: ids
    });
  }

  global.StockCollection = StockCollection;

})(this, Backbone, jQuery);