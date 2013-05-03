describe("InvestmentView", function() {
  var view, investment, stock;

  beforeEach(function() {
    investment = sinon.createStubInstance(Investment);

    sinon.spy(InvestmentView.prototype, 'listenTo')

    view = new InvestmentView({
      model: investment
    });
  });

  afterEach(function() {
    InvestmentView.prototype.listenTo.restore();
  });

  it("should be a Backbone View", function() {
    expect(view).toEqual(jasmine.any(Backbone.View));
  });

  it("should be a list item", function() {
    expect(view.tagName).toEqual('li');
  });

  it("should have a 'investment' class name", function() {
    expect(view.className).toEqual('investment');
  });

  it("should render when the model changes", function() {
    expect(view.listenTo).toHaveBeenCalledWith(view.model, 'change', view.render, view);
  });

  it("should remove itself when the model is destroyed", function() {
    expect(view.listenTo).toHaveBeenCalledWith(view.model, 'destroy', view.remove, view);
  });


  describe("destroy button", function() {
    it("should bind to the click event", function() {
      expect(_(view.events).has('click .destroy-investment')).toBeTruthy();
    });

    it("should destroy the model when clicked", function() {
      view.events['click .destroy-investment'].call(view);
      expect(investment.destroy).toHaveBeenCalled();
    });
  });


  describe("rendering", function() {
    beforeEach(function() {
      stock = sinon.createStubInstance(Stock);
      stock.get.withArgs('symbol').returns('YHOO');

      investment.get.withArgs('roi').returns(0.1);
      investment.get.withArgs('stock').returns(stock);

      view.render();
    });

    it("should be chainable", function() {
      expect(view.render()).toBe(view);
    });

    it("should render the stock symbol", function() {
      expect(view.$el).toContainHtml('YHOO');
    });

    it("should render the return of investment as a percentage", function() {
      expect(view.$el).toContainHtml('10%');
    });

    it("should render a button to destroy the investment", function() {
      expect(view.$el).toContain('button.destroy-investment');
    });
  });
});