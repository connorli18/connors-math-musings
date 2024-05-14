var home = {};
var states = ['still', 'walk-first-step', 'walk-second-step', 'wave', 'scratch-first', 'scratch-second', 'blink', 'hair-first', 'hair-second', 'hair-third'];
var $me = $('#me');
var stateduration = 300;

home.init = function() {
  home.startOpeningAnimation();
};

home.startOpeningAnimation = function() {

  home.walkInScene().done(function() {
    home.wave()
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
    $me.on('click', function() {
      home.randomanimation();
    });
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
  var blinking = {
    states: [states[6], states[0]],
    stateduration: stateduration / 3,
    repeat: 4
  };
  var growhair = {
    states: [states[0], states[7], states[8], states[9]],
    stateduration: 500,
    repeat: 1
  };

  var listofanimations = [scratching, blinking, growhair];
  setTimeout(function() {
    var random = Math.floor(Math.random() * listofanimations.length);
    var randomanimation = new Sequence(listofanimations[random].states, listofanimations[random].stateduration, listofanimations[random].repeat);
    randomanimation.start();
  }, stateduration);
};

function Sequence(sequence, frameduration, repeat) {
  this.sequence = sequence;
  this.frameduration = frameduration;
  this.repeat = repeat
}

Sequence.prototype.start = function() {
  var that = this;
  for (var i = 0; i <= (that.repeat - 1); i++) {

    (function(i) {
      setTimeout(function() {
        for (var o = 0; o < that.sequence.length; o++) {
          (function(o) {
            setTimeout(function() {
              $me.removeClass();
              $me.addClass(that.sequence[o]);
            }, that.frameduration * o);
          }(o));
        }
      }, that.frameduration * that.sequence.length * i);
    }(i));

  }
};

home.init();


window.onload = function() {
    var text = "Connor's Math Musings...";
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