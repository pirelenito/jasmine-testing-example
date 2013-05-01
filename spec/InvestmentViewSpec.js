describe("InvestmentView", function() {
  var view, investment, stock;

  beforeEach(function() {
    stock = new Stock({
      symbol: 'YHOO',
      sharePrice: 22
    });
    investment = new Investment({
      stock: stock,
      shares: 100,
      sharePrice: 20
    });
    view = new InvestmentView({
      model: investment
    });
  });

  describe("render", function() {
    beforeEach(function() {
      view.render();
    });

    it("should render the stock symbol", function() {
      expect(view.$el).toContainHtml('YHOO');
    });

    it("should render the return of investment", function() {
      expect(view.$el).toContainHtml('10%');
    });

    it("should have a good-investment class when the investment is good", function() {
      expect(view.$el).toHaveClass('good-investment');
    });
  });
});