import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'pricing-table', 'row' ],
  plans: Ember.computed.oneWay('globals.plans'),

  selected: function () {
    console.log('selectedPlan changed');
    var s = this.get('selectedPlan'),
        plans = this.get('plans'),
        self = this;

    plans.forEach(function (plan) {
      var eq = (plan.get('title') === s);
      
      if(eq) {
        self.set('plan', plan);
      }
    });
  }.observes('selectedPlan'),

  radioID: function () {
    return Math.random().toString(36).substring(2);
  }.property()
});