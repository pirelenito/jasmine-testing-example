define([
  'lib/backbone',
  'lib/jquery',
  'views/ApplicationView',
  'routers/InvestmentsRouter'
],
function (Backbone, $, ApplicationView, InvestmentsRouter) {
  var Application = {
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
    this.router = new InvestmentsRouter();
    this.router.on('route:goodInvestments', function () {
      this.applicationView.showGoodInvestments();
    }, this);

    this.router.on('route:badInvestments', function () {
      this.applicationView.showBadInvestments();
    }, this);

    this.router.on('route:allInvestments', function () {
      this.applicationView.showAllInvestments();
    }, this);

    Backbone.history.start();
  }

  function fetchStock (investment) {
    investment.get('stock').fetch()
  }

  return Application;
});