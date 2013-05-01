describe("Stock", function() {
  var stock;

  beforeEach(function() {
    stock = new Stock({ symbol: 'YHOO' });
  });

  it("should be a Backbone.Model", function() {
    expect(stock).toEqual(jasmine.any(Backbone.Model));
  });

  describe("sync", function() {
    it("should use the stock symbol as the id", function() {
      expect(stock.idAttribute).toEqual('symbol');
    });

    it("should make requests to the /stocks url", function() {
      expect(stock.urlRoot).toEqual('/stocks');
    });
  });
});