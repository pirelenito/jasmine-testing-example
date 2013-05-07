describe("ApplicationRouter", function() {
  var router, callback;

  beforeEach(function() {
    router = new ApplicationRouter();
    callback = sinon.spy();
  });

  it("should route '/investments/good'", function() {
    router.on('route:goodInvestments', callback);

    Backbone.history.loadUrl('/investments/good')

    expect(callback).toHaveBeenCalled();
  });

  it("should route '/investments/bad'", function() {
    router.on('route:badInvestments', callback);

    Backbone.history.loadUrl('/investments/bad')

    expect(callback).toHaveBeenCalled();
  });

  it("should route '/investments/all'", function() {
    router.on('route:allInvestments', callback);

    Backbone.history.loadUrl('/investments/all')

    expect(callback).toHaveBeenCalled();
  });

  it("should route '/investments/:id'", function() {
    router.on('route:investment', callback);

    Backbone.history.loadUrl('/investments/42')

    expect(callback).toHaveBeenCalled('42');
  });
});