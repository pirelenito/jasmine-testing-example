describe("NewInvestmentView", function() {
  var view;

  beforeEach(function() {
    loadFixtures('NewInvestmentView.html');

    view = new NewInvestmentView({
      id: 'new-investment'
    });
  });

  it("should expose a property with its DOM element", function() {
    expect(view.$el).toExist();
  });

  it("should allow the input of the stock symbol", function() {
    expect(view.$el.find('.new-investment-stock-symbol')).toBe('input[type=text]');
  });

  it("should allow the input of shares", function() {
    expect(view.$el).toContainHtml('<input type="number" class="new-investment-shares" name="shares" value="0">');
  });

  it("should allow the input of the share price", function() {
    expect(view.$el).toContain('input[type=number].new-investment-share-price');
  });

  describe("on initialization", function() {
    itShouldBeAtTheDefaultState();
  });

  describe("given the inputs are correctly filled", function() {
    beforeEach(function() {
      view.$el.find('.new-investment-stock-symbol').val('YHOO').trigger('change');
      view.$el.find('.new-investment-shares').val(100).trigger('change');
      view.$el.find('.new-investment-share-price').val(20).trigger('change');
    });

    it("should allow to add", function() {
      expect(view.$el.find('input[type=submit]')).not.toBeDisabled();
    });

    describe("when its add button is clicked", function() {
      var callbackSpy;

      beforeEach(function() {
        spyOnEvent(view.$el, 'submit');
        callbackSpy = jasmine.createSpy('callback');
        view.onCreate(callbackSpy);

        view.$el.find('input[type=submit]').click();
      });

      it("should create a new investment with the data on the input", function() {
        expect(callbackSpy).toHaveBeenCalled();
      });

      it("should have submited the form, but prevented the default behavior", function() {
        expect('submit').toHaveBeenTriggeredOn(view.$el);
        expect('submit').toHaveBeenPreventedOn(view.$el);
      });

      itShouldBeAtTheDefaultState();
    });

    describe("when the stock input is cleared", function() {
      beforeEach(function() {
        view.$el.find('.new-investment-stock-symbol').val('').trigger('change');
      });

      itShouldNotAllowToAdd();
    });

    describe("when the shares input is cleared", function() {
      beforeEach(function() {
        view.$el.find('.new-investment-shares').val('').trigger('change');
      });

      itShouldNotAllowToAdd();
    });

    describe("when the share price input is cleared", function() {
      beforeEach(function() {
        view.$el.find('.new-investment-share-price').val('').trigger('change');
      });

      itShouldNotAllowToAdd();
    });
  });

  // shared specs

  function itShouldNotAllowToAdd () {
    it("should not allow to add", function() {
      expect(view.$el.find('input[type=submit]')).toBeDisabled();
    });
  }

  function itShouldBeAtTheDefaultState () {
    it("should have an empty stock symbol", function() {
      expect(view.$el.find('.new-investment-stock-symbol')).toHaveValue('');
    });

    it("should have its shares value to zero", function() {
      expect(view.$el.find('.new-investment-shares')).toHaveValue('0');
    });

    it("should have its share price value to zero", function() {
      expect(view.$el.find('.new-investment-share-price')).toHaveAttr('value', '0');
    });

    it("should have its stock symbol input on focus", function() {
      expect(view.$el.find('.new-investment-stock-symbol')).toBeFocused();
    });

    itShouldNotAllowToAdd();
  }
});