(function (global, $) {
  function NewInvestmentView (params) {
    this.$el = $('#' + params.id);
  };

  global.NewInvestmentView = NewInvestmentView;
}(this, jQuery))