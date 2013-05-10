define([
  'lib/jquery'
],
function ($) {
  $.fn.disableInput = function () {
    this.attr('disabled', 'disabled');
    return this;
  };

  $.fn.enableInput = function () {
    this.removeAttr('disabled');
    return this;
  }
});