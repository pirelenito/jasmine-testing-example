describe("Stock", function() {
  var stock;
  var originalSharePrice = 0;

  beforeEach(function() {
    stock = new Stock({
      symbol: 'YHOO',
      sharePrice: originalSharePrice
    })
  });

  it("should have a share price", function() {
    expect(stock.sharePrice).toEqual(originalSharePrice);
  });

  describe("when fetched", function() {
    var fetched = false;

    beforeEach(function() {
      stock.fetch({
        success: function () {
          fetched = true;
        }
      });

      waitsFor(function (argument) {
        return fetched;
      }, 'Timeout fetching stock data', 2000);
    });

    it("should update its share price", function() {
      expect(stock.sharePrice).not.toEqual(originalSharePrice);
      expect(stock.sharePrice).not.toBeUndefined();
      expect(stock.sharePrice).toBeGreaterThan(0);
    });
  });

  // same as 'when fetched, should update its share price'
  // wrote to demonstrate the runs function
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