import Ember from 'ember';

export default Ember.Controller.extend({
  subroute: function () {
    return this.get('currentPath');
  }.property('currentPath')
});