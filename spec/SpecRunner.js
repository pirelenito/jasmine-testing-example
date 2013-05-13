require([
  'spec/SpecIndex',

  'jquery',
  'jasmine',
  'sinon',
  'jasmine-html',
  'jasmine-jquery',
  'jasmine-sinon',

  'spec/SpecHelper'
],
function(specs, $, jasmine) {
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();
  jasmineEnv.addReporter(htmlReporter);
  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  $(function () {
    require(specs, function () {
      jasmineEnv.execute();
    });
  });
});