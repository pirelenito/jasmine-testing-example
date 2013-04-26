describe("InvestmentListView", function() {
  var investment,
      investmentView,
      collection,
      view;

  beforeEach(function() {
    collection = {};
    collection.each = sinon.stub();

    sinon.stub(InvestmentListView.prototype, 'listenTo')

    view = new InvestmentListView({ collection: collection });
  });

  afterEach(function() {
    InvestmentListView.prototype.listenTo.restore();
  });

  it("should add all investments of the collection", function() {
    expect(collection.each).toHaveBeenCalledWith(view.addInvestment, view);
  });

  it("should add a investment to the list once it is add to the collection", function() {
    expect(view.listenTo).toHaveBeenCalledWith(collection, 'add', view.addInvestment);
  });

  it("should remove a investment to from list once it is removed from to the collection", function() {
    expect(view.listenTo).toHaveBeenCalledWith(collection, 'remove', view.removeInvestment);
  });

  it("should allow chained calls to the render function", function() {
    expect(view.render()).toBe(view);
  });

  describe("when an investment is add", function() {
    beforeEach(function() {
      investment = { cid: 'fakeInvestment' };

      investmentView = {};
      investmentView.el = '<li>Investment</li>'
      investmentView.remove = sinon.stub()
      investmentView.render = sinon.stub().returns(investmentView);

      stub = sinon.stub(window, 'InvestmentView');
      stub.withArgs({ model: investment }).returns(investmentView);

      view.addInvestment(investment);
    });

    afterEach(function() {
      InvestmentView.restore();
    });

    it("should not render the investment", function() {
      expect(investmentView.render).not.toHaveBeenCalled();
      expect(view.$el).not.toContainHtml(investmentView.el);
    });

    describe("and when it is rendered", function() {
      beforeEach(function() {
        view.render();
      });

      it("should render the investment", function() {
        expect(investmentView.render).toHaveBeenCalled();
        expect(view.$el).toContainHtml(investmentView.el);
      });

      describe("and when it is removed", function() {
        beforeEach(function() {
          view.removeInvestment(investment);
        });

        it("should have removed the rendered investment ", function() {
          expect(investmentView.remove).toHaveBeenCalled();
        });
      });
    });

    describe("and when it is removed and then rendered", function() {
      beforeEach(function() {
        view.removeInvestment(investment);
        view.render();
      });

      it("should not render the investment", function() {
        expect(investmentView.render).not.toHaveBeenCalled();
        expect(view.$el).not.toContainHtml(investmentView.el);
      });
    });
  });
});