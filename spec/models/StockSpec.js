define([
  'spec/SpecHelper',
  'models/Stock'
],
function (jasmine, Stock) {
  describe("Stock", function() {
    var stock;

    beforeEach(function() {
      stock = new Stock({ symbol: 'YHOO' });
    });

    it("should have a default share price of zero", function() {
      expect(stock.get('sharePrice')).toEqual(0);
    });

    it("should allow fetching its information from a remote server", function() {
      expect(stock.idAttribute).toEqual('symbol');
      expect(stock.urlRoot).toEqual('/stocks');
    });
  });
});