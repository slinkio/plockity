import Ember from 'ember';

export default Ember.Component.extend({
  min: 0,
  max: 100,

  percent: function () {
    var c    = this.getProperties('min', 'max', 'value');
    var diff = c.max - c.min;

    return ( c.value / diff ) * 100;
  }.property('min', 'max'),

  style: function () {
    return 'width: ' + this.get('percent') + '%';
  }.property('percent'),

  text: function () {
    var r = this.get('value') + '/' + this.get('max');

    if( this.get('unit') ) {
      r += ' ' + this.get('unit');
    }

    return r;
  }.property('max', 'value')
});
