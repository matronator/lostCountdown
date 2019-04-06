//# sourceMappingURL="/js/jquery-3.3.1.min.map"

$( document ).ready(function() {

  $("#form-main").disableAutoFill();

  var prefix = ">: ";
  var typed;
  // var shouldBlink = false;
  var prefixObj = $(".span-prefix");
  var output = $(".span-out");
  var outScreen = $("#computer-screen");
  var cursor = $("#cursor");
  var cmd = $("#cmd");

  cmd.bind("copy cut paste", function( event ) {
    event.preventDefault();
  });

  prefixObj.text(prefix);
  cursor.removeClass("blink");

  /*
  function blink() {
    if (shouldBlink === true) {
      cursor.fadeOut(500, function() {
        cursor.fadeIn(500, function() {
          blink();
        })
      });
    }
  }
  */

  outScreen.click(function() {
    cmd.focus();
    cursor.addClass("blink");
  });

  cmd.on("input", function ( event ) {
    typed = cmd.val();
    output.text(typed);
  });

  cmd.keydown(function( event ) {
    if (!((event.keyCode >= 48 && event.keyCode <= 90) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 13 || event.keyCode == 16 || event.keyCode == 20 || event.keyCode == 32)) {
      event.preventDefault();
    }
  });

});