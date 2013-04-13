describe("Stock", function() {
  var stock;

  beforeEach(function() {
    stock = new Stock({
      symbol: 'YHOO'
    })
  });

  describe("when fetched", function() {
    beforeEach(function() {
      runs(function() {
        stock.fetch();
      });

      waitsFor(function (argument) {
        return stock.sharePrice;
      }, 'error', 1000);
    });

    it("should have a share price", function() {
      runs(function () {
        expect(stock.sharePrice).not.toBeUndefined();
      })
    });

    it("should have a change", function() {
      runs(function () {
        expect(stock.change).not.toBeUndefined();
      })
    });
  });
});