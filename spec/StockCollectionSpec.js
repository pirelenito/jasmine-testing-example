describe("StockCollection", function() {
  var collection, fakeServer;

  beforeEach(function() {
    fakeServer = sinon.fakeServer.create();
    fakeServer.respondWith(JSON.stringify([
      {
        symbol: 'YHOO',
        sharePrice: 20.13
      },
      {
        symbol: 'GOOG',
        sharePrice: 14
      }
    ]));
  });

  afterEach(function() {
    fakeServer.restore();
  });


  describe("given an empty collection", function() {
    beforeEach(function() {
      collection = new StockCollection();
    });

    describe("when fetch", function() {
      beforeEach(function() {
        collection.fetch();
        fakeServer.respond();
      });

      it("should request to the root stocks URL", function() {
        var url = '/stocks';
        expect(fakeServer.requests[0].url).toEqual(url);
      });

      it("should create new models with the correct share price", function() {
        expect(collection.get('YHOO').get('sharePrice')).toEqual(20.13);
        expect(collection.get('GOOG').get('sharePrice')).toEqual(14);
      });
    });
  });


  describe("given a populated collection", function() {
    var model1, model2;

    beforeEach(function() {
      model1 = new Stock({ symbol: 'YHOO' });
      model2 = new Stock({ symbol: 'GOOG' });

      collection = new StockCollection([
        model1,
        model2
      ]);
    });

    describe("when fetch", function() {
      beforeEach(function() {
        collection.fetch();
        fakeServer.respond();
      });

      it("should have request by the Stocks it contains", function() {
        // encoded '/stocks?ids[]=YHOO&ids[]=GOOG'
        var url = '/stocks?' + $.param({ ids: ['YHOO', 'GOOG'] });

        expect(fakeServer.requests[0].url).toEqual(url);
      });

      it("should update its models share price", function() {
        expect(model1.get('sharePrice')).toEqual(20.13);
        expect(model2.get('sharePrice')).toEqual(14);
      });
    });
  });
});