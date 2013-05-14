require([
  'jquery',
  'jasmine',
  'jasmine-html',

  'spec/models/StockSpec',
  'spec/models/InvestmentSpec',
  'spec/models/StockCollectionSpec',
  'spec/plugins/jquery-disable-input-spec',
  'spec/routers/InvestmentsRouterSpec',
  'spec/views/InvestmentListViewSpec',
  'spec/views/InvestmentViewSpec',
  'spec/views/NewInvestmentViewSpec'
],
function($, jasmine) {
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();
  jasmineEnv.addReporter(htmlReporter);
  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  $(function () { jasmine.getEnv().execute(); });
});