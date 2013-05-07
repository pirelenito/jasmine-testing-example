(function (global, Backbone) {

  var ApplicationRouter = Backbone.Router.extend({
    routes: {
      'investments/good': 'goodInvestments',
      'investments/bad': 'badInvestments',
      'investments/all': 'allInvestments',
      'investments/:id': 'investment'
    }
  });

  global.ApplicationRouter = ApplicationRouter;

})(this, Backbone)