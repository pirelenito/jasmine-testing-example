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
        // is not undefined?
        return !(stock.sharePrice === void 0);
      }, 'error', 750);
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