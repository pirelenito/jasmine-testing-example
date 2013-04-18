describe("Stock 'Sinon FakeServer with RegExp'", function() {
  var stock;

  beforeEach(function() {
    stock = new Stock({ symbol: 'YHOO'})
  });

  describe("when fetched", function() {
    var xhr;

    beforeEach(function() {
      xhr = sinon.fakeServer.create();
      xhr.respondWith(
        'GET',
        /\/stocks\/(.+)/,
        function (request, stockSymbol) {
          request.respond(
            200,
            { "Content-Type": "application/json" },
            JSON.stringify({ sharePrice: 20.13 })
          )
        }
      );

      stock.fetch();

      xhr.respond();
    });

    afterEach(function() {
      xhr.restore();
    });

    it("should update its share price", function() {
      expect(stock.sharePrice).toEqual(20.13);
    });
  });

});