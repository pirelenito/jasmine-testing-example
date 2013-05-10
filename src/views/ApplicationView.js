define([
  'lib/backbone',
  'views/NewInvestmentView',
  'views/InvestmentListView'
],
function (Backbone, NewInvestmentView, InvestmentListView) {
  var ApplicationView = Backbone.View.extend({
    initialize: function (options) {
      this.investments = options.investments;
      this.formView = new NewInvestmentView();
      this.listView = new InvestmentListView({
        collection: this.investments
      });

      this.listenTo(this.formView, 'create', investmentCreated);
    },

    render: function () {
      this.$el.html(this.formView.render().el);
      this.$el.append(this.listView.render().el);
      return this;
    },

    showGoodInvestments: function () {
      this.listView.showGoodInvestments();
      return this;
    },

    showBadInvestments: function () {
      this.listView.showBadInvestments();
      return this;
    },

    showAllInvestments: function () {
      this.listView.showAllInvestments();
      return this;
    }
  });

  function investmentCreated (investment) {
    this.investments.add(investment);
  }

  return ApplicationView;
});