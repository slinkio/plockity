import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'pricing-table', 'row' ],
  // Fixture data below, load prices from server
  init: function () {
    this._super();

    this.set('plans', this.get('targetObject.store').find('plan'));
  },

  selected: function () {
    var s = this.get('selectedPlan'),
        plans = this.get('plans'),
        self = this;

    plans.forEach(function (plan) {
      var eq = (plan.get('title') === s);
      plan.set('selected', eq);
      
      if(eq) {
        self.set('plan', plan);
      }
    });
  }.observes('selectedPlan')
});