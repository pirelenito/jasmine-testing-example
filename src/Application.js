(function (global) {
  global.Application = {
    start: function () {
      createData.call(this);
      createViews.call(this);
      startRouting.call(this);
    }
  }

  function createData () {
    this.investments = new Backbone.Collection();
    this.investments.on('add', fetchStock, this);
  }

  function createViews () {
    this.applicationView = new ApplicationView({
      investments: this.investments
    });
    $('.application').html(this.applicationView.render().el);
  }

  function startRouting () {
    this.router = new ApplicationRouter({
      applicationView: this.applicationView
    });
    Backbone.history.start();
  }

  function fetchStock (investment) {
    investment.get('stock').fetch()
  }
})(this)