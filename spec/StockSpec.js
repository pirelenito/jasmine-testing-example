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
    expect(stock.get('sharePrice')).toEqual(originalSharePrice);
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
            '{ "sharePrice": 20.13 }'
          )
        }
      );

      stock.fetch();

      xhr.respond();
    });

    afterEach(function() {
      xhr.restore();
    });

    it("should have made a request with the stock symbol", function() {
      expect(xhr.requests[0].url).toEqual('/stocks/YHOO');
    });

    it("should update its share price", function() {
      expect(stock.get('sharePrice')).toEqual(20.13);
    });
  });
});