describe("Stock 'Sinon FakeXMLHttpRequest'", function() {
  var stock;

  beforeEach(function() {
    stock = new Stock({ symbol: 'YHOO'})
  });

  describe("when fetched", function() {
    var xhr;

    beforeEach(function() {
      var fetchRequest;

      xhr = sinon.useFakeXMLHttpRequest();

      xhr.onCreate = function (request) {
        fetchRequest = request;
      };

      stock.fetch();

      fetchRequest.respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify({ sharePrice: 20.13 })
      );
    });

    afterEach(function() {
      xhr.restore();
    });

    it("should update its share price", function() {
      expect(stock.sharePrice).toEqual(20.13);
    });
  });
});