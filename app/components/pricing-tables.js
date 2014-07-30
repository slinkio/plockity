import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'pricing-table', 'row' ],
  // Fixture data below, load prices from server
  prices: {
    levelone: 0,
    leveltwo: 15,
    levelthree: 49
  },

  selected: function () {
    var s = this.get('plan'),
        prices = this.get('prices'),
        count = 1,
        returnObj = {};

    for (var k in prices) {
      returnObj[k] = (count.toString() === s);
      count++;
    }

    return returnObj;
  }.property('plan')
});