(function (global, $) {
  function NewInvestmentView (params) {
    var that = this;

    that._callback = function () {};

    that.$el = $('#' + params.id);
    that._$stockSymbol = that.$('.new-investment-stock-symbol');
    that._$shares = that.$('.new-investment-shares');
    that._$sharePrice = that.$('.new-investment-share-price');
    that._$add = that.$('input[type=submit]');

    bindEvents.call(that);
    reset.call(that);
  };

  NewInvestmentView.prototype = {
    $: function () {
      var that = this;

      return that.$el.find.apply(that.$el, arguments);
    },

    onCreate: function (callback) {
      var that = this;

      that._callback = callback;
    },

    create: function () {
      var that = this;

      var newInvestment = new Investment({
        stock: new Stock({symbol: that._$stockSymbol.val()}),
        shares: parseInt(that._$shares.val(), 10),
        sharePrice: parseInt(that._$sharePrice.val(), 10)
      });

      invokeCallbacks.call(that, newInvestment);
      return newInvestment;
    },

    getSymbol: function () {
      return this._$stockSymbol.val()
    }
  };

  // private methods (invoke with 'call')

  function bindEvents () {
    var that = this;

    that.$el.on('submit', function (event) {
      event.preventDefault();
      submit.call(that);
    });

    that.$el.on('change', 'input', updateAddButton.bind(that))
  }

  function submit () {
    var that = this;

    that.create();
    reset.call(that);
  }

  function invokeCallbacks (newInvestment) {
    var that = this;

    that._callback(newInvestment);
  }

  function updateAddButton () {
    var that = this;

    if (canCreate.call(that)) {
      that._$add.enableInput();
    } else {
      that._$add.disableInput();
    }
  }

  function canCreate () {
    var that = this;

    return that._$stockSymbol.val().length > 0 &&
           that._$shares.val() > 0 &&
           that._$sharePrice.val() > 0;
  }

  function reset () {
    var that = this;

    that._$stockSymbol.val('');
    that._$stockSymbol.focus();
    that._$shares.val('0');
    that._$sharePrice.val('0');
    that._$add.disableInput();
  }

  global.NewInvestmentView = NewInvestmentView;
})(this, jQuery);