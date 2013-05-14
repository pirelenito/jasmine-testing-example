define([
  'spec/SpecHelper',
  'backbone',
  'views/NewInvestmentView',
  'models/Investment',
  'models/Stock'
],
function (jasmine, Backbone, NewInvestmentView) {
  describe("NewInvestmentView", function() {
    var view;

    beforeEach(function() {
      view = new NewInvestmentView({
        id: 'new-investment'
      })

      setFixtures(view.$el);

      view.render();
    });

    it("should be a Backbone View", function() {
      expect(view).toEqual(jasmine.any(Backbone.View));
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

    itShouldBeAtTheDefaultState();

    describe("with its inputs correctly filled", function() {
      beforeEach(function() {
        view.$el.find('.new-investment-stock-symbol').val('YHOO').trigger('change');
        view.$el.find('.new-investment-shares').val(100).trigger('change');
        view.$el.find('.new-investment-share-price').val(20).trigger('change');
      });

      it("should allow to add", function() {
        expect(view.$el.find('input[type=submit]')).not.toBeDisabled();
      });

      it("should be able to create an investment from the inputs", function() {
        var newInvestment = view.create();
        expect(newInvestment.get('stock').get('symbol')).toEqual('YHOO');
        expect(newInvestment.get('shares')).toEqual(100);
        expect(newInvestment.get('sharePrice')).toEqual(20);
      });

      describe("when its add button is clicked", function() {
        beforeEach(function() {
          spyOnEvent(view.$el, 'submit');

          view.$el.find('input[type=submit]').click();
        });

        it("should submit the form", function() {
          expect('submit').toHaveBeenTriggeredOn(view.$el);
        });
      });

      describe("and when the form is submited", function() {
        beforeEach(function() {
          spyOn(view, 'create');
          spyOnEvent(view.$el, 'submit');

          view.$el.submit();
        });

        it("should prevent the event default behavior", function() {
          expect('submit').toHaveBeenPreventedOn(view.$el);
        });

        it("should create an investment", function() {
          expect(view.create).toHaveBeenCalled();
        });

        itShouldBeAtTheDefaultState();
      });

      describe("and when an investment is created", function() {
        var callbackSpy;
        var investment;

        beforeEach(function() {
          callbackSpy = jasmine.createSpy('callback');
          view.on('create', callbackSpy);

          investment = view.create();
        });

        it("should invoke the 'onCreate' callback with the created investment", function() {
          expect(callbackSpy).toHaveBeenCalled();
          expect(callbackSpy).toHaveBeenCalledWith(investment);

          expect(callbackSpy.wasCalled).toBeTruthy();
          expect(callbackSpy.mostRecentCall.args[0]).toBe(investment);
        });
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
});