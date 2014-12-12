import Ember from 'ember';

export default Ember.Component.extend({
  delay: 3000,
  slides: {
    '1': {
      enter: function () {

      },
      exit: function () {

      }
    }
  },

  _slide: function () {
    if( !this.get('slide') ) {
      var self = this;

      this.get('slides')[1].enter().then(function () {
        return self.set('slide', 1);
      });
    }

    var delay = this.get('delay');

    Ember.run.later(this, this._transitionSlides, delay);
  }.observes('slide').on('init'),

  _transitionSlides: function () {
    var fnExists = function ( slide, type ) {
      return ( slide && slide[type] && typeof slide[type] === 'function' );
    };

    var slide = this.get('slides')[this.get('slide').toString()],
        enter = ( fnExists(slide, 'enter') ) ? slide.enter : this._defaultEnter,
        exit  = ( fnExists(slide, 'exit') ) ? slide.exit : this._defaultExit;

    enter.call(this).then(exit.bind(this)).then(function () {
      // Finish up
    });
  },

  _defaultEnter: function () {
    
  },

  _defaultExit: function () {
    
  }
});
