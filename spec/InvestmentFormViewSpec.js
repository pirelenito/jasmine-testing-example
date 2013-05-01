describe("InvestmentFormView", function() {
  var view;

  beforeEach(function() {
    view = new InvestmentFormView({
      // model: new Backbone.Model()
    }).render();
  });

  it("should allow the input of the share price", function() {
    // console.log(view.el)
    // console.log(view.template)
    // view.sharePrice(20);
    // expect(view.sharePrice()).toEqual(20);

    view.$('.new-investment-share-price').trigger('change')
  });
});