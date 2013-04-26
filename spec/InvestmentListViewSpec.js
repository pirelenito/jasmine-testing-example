describe("InvestmentListView", function() {
  var firstInvestment, secondInvestment, thirdInvestment;
  var firstInvestmentView, secondInvestmentView, thirdInvestmentView;
  var collection, view;

  beforeEach(function() {
    firstInvestment = new Backbone.Model();
    secondInvestment = new Backbone.Model();
    thirdInvestment = new Backbone.Model();

    firstInvestmentView = new Backbone.View({ el: '<li>first Investment</li>' });
    secondInvestmentView = new Backbone.View({ el: '<li>second Investment</li>' });
    thirdInvestmentView = new Backbone.View({ el: '<li>third Investment</li>' });

    stub = sinon.stub(window, 'InvestmentView');
    stub.withArgs({ model: firstInvestment }).returns(firstInvestmentView);
    stub.withArgs({ model: secondInvestment }).returns(secondInvestmentView);
    stub.withArgs({ model: thirdInvestment }).returns(thirdInvestmentView);

    collection = new Backbone.Collection([
      firstInvestment,
      secondInvestment
    ]);

    view = new InvestmentListView({
      collection: collection
    });
  });

  afterEach(function() {
    InvestmentView.restore();
  });

  it("should allow chaining calls to render", function() {
    expect(view.render()).toBe(view);
  });

  describe("when rendering", function() {
    beforeEach(function() {
      sinon.spy(firstInvestmentView, 'render');
      sinon.spy(secondInvestmentView, 'render');
      view.render();
    });

    it("should render the investments", function() {
      expect(firstInvestmentView.render).toHaveBeenCalled();
      expect(view.$el).toContainHtml(firstInvestmentView.el);

      expect(secondInvestmentView.render).toHaveBeenCalled();
      expect(view.$el).toContainHtml(secondInvestmentView.el);
    });

    describe("when add new investment is add to the collection", function() {
      beforeEach(function() {
        sinon.spy(thirdInvestmentView, 'render');
        collection.add(thirdInvestment);
      });

      it("should render the new insvestment", function() {
        expect(thirdInvestmentView.render).toHaveBeenCalled();
        expect(view.$el).toContainHtml(thirdInvestmentView.el);
      });
    });

    describe("when a insvestment is removed from the list", function() {
      beforeEach(function() {
        sinon.spy(secondInvestmentView, 'remove');
        collection.remove(secondInvestment);
      });

      it("should remove the removed investment", function() {
        expect(secondInvestmentView.remove).toHaveBeenCalled();
        expect(view.$el).not.toContainHtml(secondInvestmentView.el);
      });
    });
  });
});