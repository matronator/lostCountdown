//# sourceMappingURL="/js/jquery-3.3.1.min.map"

$( document ).ready(function() {

  $("#form-main").disableAutoFill();

  var prefix = ">: ";
  var typed;
  var prefixObj = $(".span-prefix");
  var output = $(".span-out");
  var outScreen = $("#computer-screen");
  var cursor = $("#cursor");
  var cmd = $("#cmd");

  // Debounce function from https://davidwalsh.name/javascript-debounce-function

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    }
  }

  cmd.bind("copy cut paste", function( event ) {
    event.preventDefault();
  });

  prefixObj.text(prefix);
  cursor.removeClass("blink");

  outScreen.click(function() {
    cmd.focus();
    cursor.addClass("blink");
  });

  cmd.blur(function() {
    cursor.removeClass("blink");
  })

  cmd.on("input", function ( event ) {
    typed = cmd.val();
    output.text(typed);
  });

  /* 48 to 90 are numbers and letters
  /* 96 to 105 are numpad numbers
  /* 8 = backspase
  /* 9 = tab
  /* 13 = enter
  /* 16 = shift
  /* 20 = caps lock
  /* 32 = space */

  cmd.keydown(function( event ) {
    if (!((event.keyCode >= 48 && event.keyCode <= 90) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 13 || event.keyCode == 16 || event.keyCode == 20 || event.keyCode == 32)) {
      event.preventDefault();
    } else {
      if(!(event.keyCode == 16 || event.keyCode == 20)) {
        cursor.removeClass("blink");
      }
    }
  });

  cmd.keyup(debounce(function() {
    cursor.addClass("blink");
  }, 1000));

  // Temporary
  // beep.wav - 2.051s -> 2051ms

  // Safari complicating everything, making my life miserable...
  // apparently audio.play(); doesn't work unless it's on click etc.

  var timeleft = $("#time-left").text();
  var beep = new Audio("/sound/beep.m4a");

  beep.onended = function() {
    if(timeleft <= 4) {
      this.currentTime = 0;
      this.play();
    }
  };

  $("#time-left").click(function() {
    $( this ).text(timeleft - 1);
    timeleft = $( this ).text();
    if(timeleft <= 0) {
      timeleft = 10;
      $( this ).text(timeleft);
    }
    if(timeleft <= 4) {
      beep.play();
    }
  });

  // End of temporary

});
