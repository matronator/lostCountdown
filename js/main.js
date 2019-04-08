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
  var timeLeft = $("#time-left").text();
  var alarmPlaying = 0;
  var shouldPlay = 0;

  // Temporary
  // beep.wav - 2.051s -> 2051ms

  // Safari complicating everything, making my life miserable...
  // apparently audio.play(); doesn't work unless it's on click etc.

  var beep = new Audio("/sound/beep.m4a");
  var rewind = new Audio("/sound/rewind.m4a");

  beep.onended = function() {
    if(alarmPlaying >= 2) {
      this.currentTime = 0;
      this.play();
    }
  };

  // End of temporary

  function getTime() {
    $.ajax({
      url: 'http://lost.matronator.com/timeleft.php',
      type: 'GET',
      dataType: 'json',
      success: function(result) {
        var data = result;
        $("#time-left").text(result.totalM);
        timeLeft = result.totalM;
        shouldPlay = result.alarmon;
        if (shouldPlay == 1) {
          if (alarmPlaying < 2) {
            alarmPlaying = 2;
            beep.play();
          }
        } else {
          alarmPlaying = 0;
        }
      }
    });
  }

  function resetTimer() {
    $.ajax({
      url: 'http://lost.matronator.com/entercode.php',
      type: 'GET',
      dataType: 'json',
      success: function(result) {
        getTime();
        shouldPlay = 0;
        alarmPlaying = 0;
        cmd.val("");
        output.text("");
      }
    });
  }

  getTime();

  setInterval(function() {
    getTime();
  }, 20000);

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

  cmd.on("keyup keypress", function( event ) {
    var keyc = event.keyCode || event.which;
    if (keyc === 13) {
      event.preventDefault;

      if (timeLeft > 4) {
        cmd.val("");
        output.text("Code can only be submitted when alarm starts. (press Y to confirm)");
      } else {
        if (cmd.val() == "4 8 15 16 23 42") {
          rewind.play();
          resetTimer();
        } else {
          cmd.val("");
          output.text("");
        }
      }
      return false;
    }
  });

  cmd.keyup(debounce(function() {
    cursor.addClass("blink");
  }, 1000));

  $("#time-left").click(debounce(function() {
    getTime();
  }, 5000));

});
