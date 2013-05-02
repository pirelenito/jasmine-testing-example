(function (global) {
  global.Application = {
    start: function () {
      this.investments = new Backbone.Collection();

      this.router = new ApplicationRouter();
      this.view = new ApplicationView({
        investments: this.investments
      });

      $('.application').html(this.view.render().el);

      this.investments.on('add', fetchStock, this);

      this.router.on('goodInvestments', renderGoodInvestments, this)
      this.router.on('badInvestments', renderBadInvestments, this)
      this.router.on('allInvestments', renderAllInvestments, this)

      Backbone.history.start();
    }
  }

  function renderGoodInvestments () {
    this.view.showGoodInvestments();
  }

  function renderBadInvestments () {
    this.view.showBadInvestments();
  }

  function renderAllInvestments () {
    this.view.showAllInvestments();
  }

  function fetchStock (investments) {
    investments.get('stock').fetch()
  }
})(this)