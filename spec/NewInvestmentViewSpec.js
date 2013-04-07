describe("NewInvestmentView", function() {
  var view;

  beforeEach(function() {
    loadFixtures('NewInvestmentView.html');

    view = new NewInvestmentView({
      id: 'new-investment'
    });
  });

  it("should allow the input of the stock symbol", function() {
    var input = view.$el.find('.new-investment-stock-symbol');
    expect(input).toBe('input[type=text]');
    expect(input).not.toBeDisabled();
  });

  it("should allow the input of shares", function() {
    expect(view.$el).toContainHtml('<input type="number" class="new-investment-shares" name="shares" value="0">');
  });

  it("should allow the input of the share price", function() {
    expect(view.$el).toContain('input[type=number].new-investment-share-price');
  });

  it("should not allow the creation of an investment without any data", function() {
    expect(view.$el.find('input[type=submit]')).toBeDisabled();
  });

});