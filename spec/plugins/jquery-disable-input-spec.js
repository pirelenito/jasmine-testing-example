define([
  'plugins/jquery-disable-input'
],
function () {
  describe("jquery.disable", function() {
    var $input;

    beforeEach(function() {
      setFixtures('<input type="text" name="add" value="Add">')
      $input = $('input[type=text]');
    });

    it("should be chainable", function() {
      expect($input.disableInput()).toBe($input);
    });

    it("should disable an input", function() {
      $input.disableInput();
      expect($input).toBeDisabled();
    });
  });

  describe("jquery.enable", function() {
    var $input;

    beforeEach(function() {
      setFixtures('<input type="text" name="add" value="Add" disabled="disabled">')
      $input = $('input[type=text]');
    });

    it("should be chainable", function() {
      expect($input.enableInput()).toBe($input);
    });

    it("should enable an input", function() {
      $input.enableInput();
      expect($input).not.toBeDisabled();
    });
  });
});