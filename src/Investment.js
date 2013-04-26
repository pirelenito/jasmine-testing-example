(function (global) {

  var Investment = Backbone.Model.extend({
    initialize: function () {
      this.set('cost', this.get('shares') * this.get('sharePrice'));

      this.on('change:sharePrice', updateROI.bind(this));
      this.on('change:roi', updateIsGood.bind(this));
      this.get('stock').on('change:sharePrice', updateROI.bind(this));
    }
  });

  function updateROI () {
    var sharePrice = this.get('sharePrice');
    var stockSharePrice = this.get('stock').get('sharePrice');
    this.set('roi', (stockSharePrice - sharePrice) / sharePrice);
  }

  function updateIsGood () {
    this.set('isGood', this.get('roi') > 0);
  }

  global.Investment = Investment;

})(this);