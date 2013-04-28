(function (global) {

  var Investment = Backbone.Model.extend({
    initialize: function () {
      this.on('change:sharePrice', updateCost, this);
      this.on('change:shares', updateCost, this);

      this.on('change:roi', updateIsGood, this);

      this.on('change:sharePrice', updateROI, this);
      this.listenTo(this.get('stock'), 'change:sharePrice', updateROI, this);

      this.on('change:cost change:isGood change:roi', preventSetter, this);

      updateROI.call(this);
      updateIsGood.call(this);
      updateCost.call(this);
    }
  });

  function updateROI () {
    var sharePrice = this.get('sharePrice');
    var stockSharePrice = this.get('stock').get('sharePrice');
    this.set('roi', (stockSharePrice - sharePrice) / sharePrice, { inner: true });
  }

  function updateIsGood () {
    this.set('isGood', this.get('roi') > 0, { inner: true });
  }

  function updateCost () {
    this.set('cost', this.get('shares') * this.get('sharePrice'), { inner: true });
  }

  function preventSetter (_, _, options) {
    if (!options.inner) { throw 'nOOOOO' };
  }

  global.Investment = Investment;

})(this);