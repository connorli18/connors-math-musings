$(document).ready(function() {

  var home = {};
  var states = ['still', 'walk-first-step', 'walk-second-step', 'wave', 'scratch-first', 'scratch-second', 'blink', 'hair-first', 'hair-second', 'hair-third'];
  var $me = $('#me');
  var stateduration = 300;

  home.init = function() {
    home.startOpeningAnimation();
  };

  home.startOpeningAnimation = function() {
    home.walkInScene().done(function() {
    home.wave();
      setInterval(home.randomanimation, 7000); // Call home.randomanimation every 3 seconds
    });
  };


  home.walkInScene = function() {

    var r = $.Deferred();
    var walking = [states[0], states[1], states[0], states[2]];

    $me.animate({
      'margin-right': '270'
    }, {
      duration: stateduration * walking.length * 2,
      complete: function() {
        r.resolve();
      }
    });

    var walkanimation = new Sequence(walking, stateduration, 2);
    walkanimation.start();

    return r;
  };

  home.wave = function() {
    setTimeout(function() {
      $me.removeClass();
      $me.addClass(states[3]);
    }, stateduration);

    setTimeout(function() {
      $me.removeClass();
      $me.css({
        'cursor': 'pointer'
      });
    }, stateduration * 8);
  };


  home.randomanimation = function() {
    var scratching = {
      states: [states[4], states[5]],
      stateduration: stateduration,
      repeat: 6
    };

    var listofanimations = [scratching];
    setTimeout(function() {
      var random = Math.floor(Math.random() * listofanimations.length);
      var randomanimation = new Sequence(listofanimations[random].states, listofanimations[random].stateduration, listofanimations[random].repeat);
      randomanimation.start(function() {
        // After the animation is finished, add the class for the normal state
        $me.removeClass();
        $me.addClass(states[0]);
      });
    }, stateduration);
  };

  function Sequence(sequence, frameduration, repeat) {
    this.sequence = sequence;
    this.frameduration = frameduration;
    this.repeat = repeat
  }

  Sequence.prototype.start = function(callback) {
    var that = this;
    for (var i = 0; i <= (that.repeat - 1); i++) {
      (function(i) {
        setTimeout(function() {
          for (var o = 0; o < that.sequence.length; o++) {
            (function(o) {
              setTimeout(function() {
                $me.removeClass();
                $me.addClass(that.sequence[o]);
                if (i === that.repeat - 1 && o === that.sequence.length - 1) {
                  // If this is the last frame of the last repeat, call the callback function
                  callback && callback();
                }
              }, that.frameduration * o);
            }(o));
          }
        }, that.frameduration * that.sequence.length * i);
      }(i));
    }
  };

  home.init();


  window.onload = function() {
      var text = "Connor's Math Musings . . .";
      var i = 0;
      var speed = 150; // Speed of typing in milliseconds
      var sleak = document.querySelector('h1.sleak');

      function typeWriter() {
          if (i < text.length) {
              sleak.innerHTML += text.charAt(i);
              i++;
              setTimeout(typeWriter, speed);
          }
      }

      typeWriter();
  }


});
