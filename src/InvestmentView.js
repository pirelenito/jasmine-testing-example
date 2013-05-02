(function (global, $) {

  var InvestmentView = Backbone.View.extend({
    template: template,

    initialize: function (params) {
      this.model.on('change', modelChanged, this);
    },

    render: function () {
      this._rendered = true;
      this.$el.html(template({
        symbol: this.model.get('stock').get('symbol'),
        roi: formatedRoi.call(this)
      }));
      addStatusClass.call(this);
      return this;
    },

    show: function () {
      this.$el.show();
      return this;
    },

    hide: function () {
      this.$el.hide();
      return this;
    },

    setVisible: function (value) {
      value ? this.show() : this.hide();
      return this;
    }
  });

  function formatedRoi () {
    return (this.model.get('roi') * 100) + '%'
  }

  function addStatusClass () {
    this.$el.addClass(this.model.get('isGood') ? 'good-investment' : 'bad-investment');
  }

  function modelChanged () {
    if (this._rendered) { this.render() };
  }

  var template = _.template([
    '<h1><%= symbol %><h1>',
    '<p><%= roi %><p>'
  ].join('\n'));

  global.InvestmentView = InvestmentView;

})(this, jQuery, Backbone);