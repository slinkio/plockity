import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'slide-show' ],

  delay: 6000,
  slides: [
    // Slide 1
    {
      enter: function ( $el ) {
        return new Ember.RSVP.Promise(function ( resolve ) {
          $el.css({
            opacity: 0,
            display: 'block'
          })
          .velocity({
            opacity: 1
          }, {
            duration: 1500,
          })
          .find('.slide-text-container').velocity({
            translateX: [ 0, '500%' ],
            rotateZ:    [ 0, '500deg' ]
          }, {
            duration: 1000
          });

          $el.find('.bot').css({
            'transform-origin': 'bottom center'
          })
          .velocity({
            translateX: [ 0, '-500%' ]
          }, {
            duration: 1000,
            complete: resolve
          })
          .velocity({
            rotateZ: [ '-10deg', 0 ]
          }, {
            duration: 1000
          })
          .velocity({
            rotateZ: [ '10deg', '-10deg' ]
          }, {
            duration: 2000,
            loop: true
          });
        });
      },
      exit: function ( $el ) {
        return new Ember.RSVP.Promise(function ( resolve ) {
          $el.find('.slide-text-container')
          .velocity({
            translateX: '500%'
          },
          {
            duration: 1000
          });
          $el.find('.bot')
          .velocity('stop')
          .velocity({
            translateX: '-500%'
          }, {
            complete: function () {
              $el.css({
                display: 'none'
              });

              resolve();
            },
            duration: 1000
          });
        });
      }
    },
    // Slide 2
    {
      enter: function ( $el ) {
        return new Ember.RSVP.Promise(function ( resolve ) {
          $el.css({
            opacity: 0,
            display: 'block'
          })
          .velocity({
            opacity: 1
          }, {
            duration: 1500,
          })
          .find('.slide-text-container').velocity({
            translateX: [ 0, '500%' ],
            rotateZ:    [ 0, '500deg' ]
          }, {
            duration: 1000
          });

          $el.find('.server-container').css({
            'transform-origin': 'bottom center'
          })
          .velocity({
            translateX: [ 0, '-500%' ]
          }, {
            duration: 1000,
            complete: resolve
          })
          .velocity({
            rotateZ: [ '-10deg', 0 ]
          }, {
            duration: 1000
          })
          .velocity({
            rotateZ: [ '10deg', '-10deg' ]
          }, {
            duration: 2000,
            loop: true
          });
        });
      },
      exit: function ( $el ) {
        return new Ember.RSVP.Promise(function ( resolve ) {
          $el.find('.slide-text-container')
          .velocity({
            translateX: '500%'
          },
          {
            duration: 1000
          });
          $el.find('.server-container')
          .velocity('stop')
          .velocity({
            translateX: '-500%'
          }, {
            complete: function () {
              $el.css({
                display: 'none'
              });

              resolve();
            },
            duration: 1000
          });
        });
      }
    }
  ],

  _start: function () {
    if( this.get('slide') === undefined ) {
      var self  = this,
          delay = this.get('delay');

      this.get('slides')[0].enter(this.$('.s-1')).then(function () {
        self.set('slide', 0);
        Ember.run.later(self, self._transitionSlides, delay);
      });
    }
  }.on('didInsertElement'),

  _transitionSlides: function () {
    var self = this;

    var fnExists = function ( slide, type ) {
      return ( slide && slide[type] && typeof slide[type] === 'function' );
    };

    var currentIndex = this.get('slide'),
        nextIndex    = ( this.get('slides.length') === currentIndex + 1 ) ? 0 : currentIndex + 1,
        $currentEl   = this.$('.s-' + (currentIndex + 1)),
        $nextEl      = this.$('.s-' + (nextIndex + 1));

    var nextSlide = this.get('slides')[nextIndex],
        prevSlide = this.get('slides')[currentIndex],
        enter = ( fnExists(nextSlide, 'enter') ) ? nextSlide.enter : this._defaultEnter,
        exit  = ( fnExists(prevSlide, 'exit') ) ? prevSlide.exit : this._defaultExit;

    exit.call(this, $currentEl).then(enter.bind(this, $nextEl)).then(function () {
      self.set('slide', nextIndex);
      Ember.run.later(self, self._transitionSlides, self.get('delay'));
    });
  },

  _defaultEnter: function () {
    
  },

  _defaultExit: function () {
    
  }
});
