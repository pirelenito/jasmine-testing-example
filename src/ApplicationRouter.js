(function (global, Backbone) {

  var ApplicationRouter = Backbone.Router.extend({
    routes: {
      'goodInvestments': goodInvestments,
      'badInvestments': badInvestments,
      'allInvestments': allInvestments
    }
  });

  function goodInvestments () {
    this.trigger('goodInvestments');
  }

  function badInvestments () {
    this.trigger('badInvestments');
  }

  function allInvestments () {
    this.trigger('allInvestments');
  }

  global.ApplicationRouter = ApplicationRouter;

})(this, Backbone)