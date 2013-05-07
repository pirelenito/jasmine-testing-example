(function (global, Backbone) {

  var ApplicationRouter = Backbone.Router.extend({
    routes: {
      'goodInvestments': goodInvestments,
      'badInvestments': badInvestments,
      'allInvestments': allInvestments
    },

    initialize: function (options) {
      this.applicationView = options.applicationView;
    }
  });

  function goodInvestments () {
    this.applicationView.showGoodInvestments();
  }

  function badInvestments () {
    this.applicationView.showBadInvestments();
  }

  function allInvestments () {
    this.applicationView.showAllInvestments();
  }

  global.ApplicationRouter = ApplicationRouter;

})(this, Backbone)