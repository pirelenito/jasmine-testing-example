(function (global, Backbone, _) {

  var InvestmentView = Backbone.View.extend({
    template: template,
    className: 'investment',
    tagName: 'li',
    events: {
      'click .destroy-investment': destroy
    },

    initialize: function () {
      this.listenTo(this.model, 'change', this.render, this);
      this.listenTo(this.model, 'destroy', this.remove, this);
    },

    render: function () {
      this.$el.html(template({
        symbol: this.model.get('stock').get('symbol'),
        roi: formatedRoi.call(this)
      }));

      return this;
    },

    setVisible: function (value) {
      value ? this.$el.show() : this.$el.hide();
      return this;
    }
  });

  function formatedRoi () {
    return (this.model.get('roi') * 100) + '%'
  }

  function destroy () {
    this.model.destroy();
  }

  var template = _.template([
    '<h1><%= symbol %><h1>',
    '<p><%= roi %><p>',
    '<button class="destroy-investment">destroy</button>'
  ].join('\n'));

  global.InvestmentView = InvestmentView;

})(this, Backbone, _);