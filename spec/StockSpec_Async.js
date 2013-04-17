describe("Stock 'Async'", function() {
  var stock;
  var originalSharePrice = 0;

  beforeEach(function() {
    stock = new Stock({
      symbol: 'YHOO',
      sharePrice: originalSharePrice
    })
  });

  it("should be able to update its share price", function() {
    var fetched = false;

    runs(function() {
      stock.fetch({
        success: function() {
          fetched = true;
        }
      });
    });

    waitsFor(function (argument) {
      return fetched;
    }, 'Timeout fetching stock data', 2000);

    runs(function() {
      expect(stock.sharePrice).not.toEqual(originalSharePrice);
    });

    runs(function() {
      expect(stock.sharePrice).not.toBeUndefined();
    });

    runs(function() {
      expect(stock.sharePrice).toBeGreaterThan(0);
    });
  });
});