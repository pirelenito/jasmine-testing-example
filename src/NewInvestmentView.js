(function (global, $) {

  var NewInvestmentView = Backbone.View.extend({
    template: template,
    tagName: 'form',
    events: {
      'submit': submit,
      'change input': updateAddButton
    },

    initialize: function () {
    },

    render: function () {
      this.$el.html(this.template());
      $stockSymbol.call(this).focus();
      updateAddButton.call(this);
      return this;
    },

    create: function () {
      var that = this;

      var newInvestment = new Investment({
        stock: new Stock({symbol: $stockSymbol.call(this).val()}),
        shares: parseInt($shares.call(this).val(), 10),
        sharePrice: parseInt($sharePrice.call(this).val(), 10)
      });

      invokeCallbacks.call(that, newInvestment);
      return newInvestment;
    }
  });

  // private methods (invoke with 'call')

  function submit (event) {
    var that = this;
    event.preventDefault();

    that.create();
    that.render();
  }

  function invokeCallbacks (newInvestment) {
    this.trigger('create', newInvestment);
  }

  function updateAddButton () {
    var that = this;

    if (canCreate.call(that)) {
      $add.call(this).enableInput();
    } else {
      $add.call(this).disableInput();
    }
  }

  function canCreate () {
    var that = this;

    return $stockSymbol.call(this).val().length > 0 &&
           parseInt($shares.call(this).val(), 10) &&
           parseInt($sharePrice.call(this).val(), 10);
  }

  function $stockSymbol () {
    return this.$('.new-investment-stock-symbol');
  }

  function $shares () {
    return this.$('.new-investment-shares');
  }

  function $sharePrice () {
    return this.$('.new-investment-share-price');
  }

  function $add () {
    return this.$('input[type=submit]');
  }

  function template () {
    return [
      '<h1>New investment</h1>',
      '<label>',
      '  Symbol:',
      '  <input type="text" class="new-investment-stock-symbol" name="stockSymbol" value="">',
      '</label>',
      '<label>',
      '  Shares:',
      '  <input type="number" class="new-investment-shares" name="shares" value="0">',
      '</label>',
      '<label>',
      '  Share price:',
      '  <input type="number" class="new-investment-share-price" name="sharePrice" value="0">',
      '</label>',
      '<input type="submit" name="add" value="Add">'
    ].join('\n');
  }

  global.NewInvestmentView = NewInvestmentView;
})(this, jQuery);