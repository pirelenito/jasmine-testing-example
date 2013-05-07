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

  describe("when fetched", function() {
    var fakeServer;

    beforeEach(function() {
      fakeServer = sinon.fakeServer.create();
      fakeServer.respondWith('/stocks/YHOO', '{ "sharePrice": 20.13 }');

      stock.fetch();

      fakeServer.respond();
    });

    afterEach(function() {
      fakeServer.restore();
    });

    it("should update its share price", function() {
      expect(stock.get('sharePrice')).toEqual(20.13);
    });
  });
});