describe("Investment", function() {
  it("should be of a stock", function() {
    var stock = new Stock();
    var investment = new Investment(stock);
    expect(investment.stock).toBe(stock);
  });
});