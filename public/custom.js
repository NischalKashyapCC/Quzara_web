(function($) {
  $.fn.countTo = function(options) {
    options = options || {};

    return $(this).each(function() {
      // set options for current element
      var settings = $.extend(
        {},
        $.fn.countTo.defaults,
        {
          from: $(this).data('from'),
          to: $(this).data('to'),
          speed: $(this).data('speed'),
          refreshInterval: $(this).data('refresh-interval'),
          decimals: $(this).data('decimals')
        },
        options
      );

      // how many times to update the value, and how much to increment the value on each update
      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;

      // references & variables that will change with each update
      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('countTo') || {};

      $self.data('countTo', data);

      // if an existing interval can be found, clear it first
      if (data.interval) {
        clearInterval(data.interval);
      }
      data.interval = setInterval(updateTimer, settings.refreshInterval);

      // initialize the element with the starting value
      render(value);

      function updateTimer() {
        value += increment;
        loopCount++;

        render(value);

        if (typeof settings.onUpdate == 'function') {
          settings.onUpdate.call(self, value);
        }

        if (loopCount >= loops) {
          // remove the interval
          $self.removeData('countTo');
          clearInterval(data.interval);
          value = settings.to;

          if (typeof settings.onComplete == 'function') {
            settings.onComplete.call(self, value);
          }
        }
      }

      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };

  $.fn.countTo.defaults = {
    from: 0, // the number the element should start at
    to: 0, // the number the element should end at
    speed: 1000, // how long it should take to count between the target numbers
    refreshInterval: 100, // how often the element should be updated
    decimals: 0, // the number of decimal places to show
    decimalsCount: 2,
    formatter: formatter, // handler for formatting the value before rendering
    onUpdate: null, // callback method for every time the element is updated
    onComplete: null // callback method for when the element finishes updating
  };

  function formatter(value, settings) {
    return value.toFixed(settings.decimals);
  }
})(jQuery);

jQuery(function($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
    formatter: function(value, options) {
      return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    }
  });
  $('.count-number.decimal').data('countToOptions', {
    formatter: function(value, options) {
      return value.toFixed(options.decimalsCount).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
    }
  });

  // start all the timers

  setInterval(function() {
    $('.timer').each(count);
  }, 3000);

  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data('countToOptions') || {});
    $this.countTo(options);
  }
});

// client slider
$(document).ready(function() {
  $('.customer-logos').slick({
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  });
});

/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('callback - particles.js config loaded');
});

// navbar resize

$(window).scroll(function() {
  if ($(this).scrollTop() > 100) {
    $('.logo').css('width', '230px');
    $('.navbar').css('padding-top', '10px');
  }
  if ($(this).scrollTop() < 100) {
    $('.logo').css('width', '284px');
    $('.navbar').css('padding-top', '10px');
  }
});

// to close the notification bar

(function($) {
  $('.pindrop-notification-placeholder').click(function() {
    $('#div1').remove();
  });
})(jQuery);

// progressbar

var startColor = '#FC5B3F';
var endColor = '#9ec64d';

$('.progress').each(function(i) {
  var circle = new ProgressBar.Circle(this, {
    color: startColor,
    easing: 'linear',
    strokeWidth: 8,
    duration: 1500,
    text: {
      value: '0'
    }
  });

  var value = $(this).attr('value') / 100;
  console.log('value', value);
  circle.animate(value, {
    from: {
      color: startColor
    },
    to: {
      color: endColor
    },
    step: function(state, circle, bar) {
      circle.path.setAttribute('stroke', state.color);
      console.log(circle);
      circle.setText((circle.value() * 100).toFixed(0) + '%');
    }
  });
});
