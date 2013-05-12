require([
  'spec/SpecIndex',

  'lib/jquery',
  'lib/jasmine-1.3.1/jasmine',
  'lib/sinon',
  'lib/jasmine-1.3.1/jasmine-html',
  'lib/jasmine-jquery',
  'lib/jasmine-sinon',

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