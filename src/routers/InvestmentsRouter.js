define([
  'lib/backbone'
],
function (Backbone) {
  var InvestmentsRouter = Backbone.Router.extend({
    routes: {
      'investments/good': 'goodInvestments',
      'investments/bad': 'badInvestments',
      'investments/all': 'allInvestments',
      'investments/:id': 'investment'
    }
  });

  return InvestmentsRouter;
});