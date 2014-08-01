import Ember from 'ember';

export default Ember.Controller.extend({
  radioID: Ember.computed.alias('parentController.radioID'),
  selectedPlan: Ember.computed.alias('parentController.selectedPlan'),
  selected: function () {
    return (this.get('parentController.plan') === this.get('content'));
  }.property('parentController.plan')
});