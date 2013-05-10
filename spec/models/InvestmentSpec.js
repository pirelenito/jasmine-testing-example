describe("Investment", function() {
  var stock;
  var investment;

  beforeEach(function() {
    stock = new Stock();
    investment = new Investment({
      stock: stock,
      shares: 100,
      sharePrice: 20
    });
  });

  it("should be a Backbone.Model", function() {
    expect(investment).toEqual(jasmine.any(Backbone.Model));
  });

  it("should have a cost", function() {
    expect(investment.get('cost')).toEqual(2000);
  });

  describe("when its stock share price is the same as its price", function() {
    beforeEach(function() {
      stock.set('sharePrice', 20);
    });

    it("should have no return of investment", function() {
      expect(investment.get('roi')).toEqual(0);
    });

    it("should be a bad investment", function() {
      expect(investment).not.toBeAGoodInvestment();
    });
  });

  describe("when its stock share price valorizes", function() {
    beforeEach(function() {
      stock.set('sharePrice', 40);
    });

    it("should have a positive return of investment", function() {
      expect(investment.get('roi')).toEqual(1);
    });

    it("should be a good investment", function() {
      expect(investment).toBeAGoodInvestment();
    });
  });

  describe("when its stock share price devalorizes", function() {
    beforeEach(function() {
      stock.set('sharePrice', 0);
    });

    it("should have a negative return of investment", function() {
      expect(investment.get('roi')).toEqual(-1);
    });

    it("should be a bad investment", function() {
      expect(investment).not.toBeAGoodInvestment();
    });
  });

});