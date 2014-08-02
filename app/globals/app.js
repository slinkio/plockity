import Ember from 'ember';

export default Ember.Object.extend({
  plansDidChange: function () {
    console.log("Plans did change");
  }.property('plans'),

  progress: NProgress
});