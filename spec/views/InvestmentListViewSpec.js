define([
  'backbone',
  'views/InvestmentListView',
  'models/Investment',
  'models/Stock'
],
function (Backbone, InvestmentListView, Investment, Stock) {
  describe("InvestmentListView", function() {

    describe("given two investments", function() {
      beforeEach(function() {
        collection = new Backbone.Collection([
          {
            sharePrice: 11,
            stock: new Stock({ symbol: 'YHOO', sharePrice: 10})
          },
          {
            sharePrice: 12,
            stock: new Stock({ symbol: 'GOOG', sharePrice: 12})
          }
        ]);

        view = new InvestmentListView({
          collection: collection
        })
      });

      describe("when rendering", function() {
        beforeEach(function() {
          view.render();
        });

        it("should render both investments", function() {
          expect(view.$el).toContainHtml('YHOO');
          expect(view.$el).toContainHtml('GOOG');
        });
      });
    });


    describe("when adding investments", function() {
      beforeEach(function() {
        collection = new Backbone.Collection();

        investment = new Investment({
          sharePrice: 11,
          stock: new Stock({ symbol: 'YHOO', sharePrice: 10})
        });

        view = new InvestmentListView({
          collection: collection
        })
      });

      describe("to a rendered list of investments", function() {
        beforeEach(function() {
          view.render();

          collection.add(investment)
        });

        it("should render the investment", function() {
          expect(view.$el).toContainHtml('YHOO');
        });
      });

      describe("to a not rendered list of investments", function() {
        beforeEach(function() {
          collection.add(investment)
        });

        it("should not render the investment", function() {
          expect(view.$el).not.toContainHtml('YHOO');
        });
      });
    });


    describe("when removing investments", function() {
      beforeEach(function() {
        investment = new Investment({
          sharePrice: 11,
          stock: new Stock({ symbol: 'YHOO', sharePrice: 10})
        })

        collection = new Backbone.Collection([investment]);

        view = new InvestmentListView({
          collection: collection
        })
      });

      describe("to a rendered list of investments", function() {
        beforeEach(function() {
          view.render();

          collection.remove(investment)
        });

        it("should remove the investment", function() {
          expect(view.$el).not.toContainHtml('YHOO');
        });
      });

      describe("to a not rendered list of investments", function() {
        beforeEach(function() {
          collection.remove(investment)
        });

        it("should not render the investment", function() {
          expect(view.$el).not.toContainHtml('YHOO');
        });
      });
    });

  });
});