import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  price:       attribute('number'),
  description: attribute('string'),
  tagline:     attribute('string'),
  title:       attribute('string'),
  features:    attribute('array'),

  // Computed
  isFree: function () {
    return this.get('price') <= 0;
  }.property('price')
});