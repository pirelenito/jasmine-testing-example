define([
  'backbone',
  'views/InvestmentView'
],
function (Backbone, InvestmentView) {
  var InvestmentListView = Backbone.View.extend({
    initialize: function (params) {
      this._nestedViews = {};
      this._rendered = false;

      addAllInvestments.call(this);
      bindCollectionEvents.call(this);
    },

    render: function () {
      this.$el.empty();
      _(this._nestedViews).each(renderNestedView, this);
      this._rendered = true;
      return this;
    },

    addInvestment: function (model) {
      var view = new InvestmentView({ model: model });
      this._nestedViews[model.cid] = view;
      if (this._rendered) { renderNestedView.call(this, view); }
    },

    removeInvestment: function (model) {
      this._nestedViews[model.cid].remove();
      delete this._nestedViews[model.cid];
    },

    showGoodInvestments: function () {
      this.collection.each(function (model) {
        getView.call(this, model).setVisible(model.get('isGood'));
      }, this);
      return this;
    },

    showBadInvestments: function () {
      this.collection.each(function (model) {
        getView.call(this, model).setVisible(!model.get('isGood'));
      }, this);
      return this;
    },

    showAllInvestments: function () {
      this.collection.each(function (model) {
        getView.call(this, model).setVisible(true);
      }, this);
      return this;
    }
  });

  function getView (model) {
    return this._nestedViews[model.cid];
  }

  function addAllInvestments (collection) {
    this.collection.each(this.addInvestment, this);
  }

  function bindCollectionEvents () {
    this.listenTo(this.collection, 'add', this.addInvestment);
    this.listenTo(this.collection, 'remove', this.removeInvestment);
  }

  function renderNestedView (view) {
    this.$el.append(view.render().el);
  }

  return InvestmentListView;
});