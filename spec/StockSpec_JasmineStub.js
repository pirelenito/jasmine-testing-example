describe("Stock 'Jasmine Stub'", function() {
  var stock;

  beforeEach(function() {
    stock = new Stock({ symbol: 'YHOO'})
  });

  describe("when fetched", function() {
    beforeEach(function() {
      spyOn($, 'getJSON').andCallFake(function(url, callback) {
        callback({ sharePrice: 20.13 });
      });

      stock.fetch();
    });

    it("should update its share price", function() {
      expect(stock.sharePrice).toEqual(20.13);
    });
  });
});