(function (global) {
  global.Application = {
    start: function () {
      this.investments = new Backbone.Collection();
      $('body').html(new ApplicationView({
        investments: this.investments
      }).render().el);

      this.investments.on('add', fetchStock);
    }
  }

  function fetchStock (investments) {
    investments.get('stock').fetch()
  }
})(this)