define([
  'spec/SpecHelper',
  'backbone',
  'routers/InvestmentsRouter'
],
function (jasmine, Backbone, InvestmentsRouter) {
  describe("InvestmentsRouter", function() {
    var router, observer;

    beforeEach(function() {
      router = new InvestmentsRouter();
      observer = jasmine.createSpy();
    });

    it("should be a Backbone Router", function() {
      expect(router).toEqual(jasmine.any(Backbone.Router));
    });

    it("should route '/investments/good'", function() {
      router.on('route:goodInvestments', observer);

      Backbone.history.loadUrl('/investments/good');

      expect(observer).toHaveBeenCalled();
    });

    it("should route '/investments/bad'", function() {
      router.on('route:badInvestments', observer);

      Backbone.history.loadUrl('/investments/bad');

      expect(observer).toHaveBeenCalled();
    });

    it("should route '/investments/all'", function() {
      router.on('route:allInvestments', observer);

      Backbone.history.loadUrl('/investments/all');

      expect(observer).toHaveBeenCalled();
    });
  });
});