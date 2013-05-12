define([
  'lib/jasmine-1.3.1/jasmine',
  'lib/jasmine-jquery'
],
function (jasine) {
  beforeEach(function() {
    this.addMatchers({
      toBeAGoodInvestment: function() {
        var investment = this.actual;
        var what = this.isNot ? 'bad' : 'good';

        this.message = function() {
          return 'Expected investment to be a '+ what +' investment';
        };

        return investment.get('isGood');
      }
    });
  });

  jasmine.getFixtures().fixturesPath = 'spec/fixtures';
})