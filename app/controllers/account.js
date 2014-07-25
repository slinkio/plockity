import Ember from 'ember';

export default Ember.Controller.extend({
  needs: [ 'application' ],

  routes: {
    'account.index': {
      description: "Overview"
    },
    'account.apps': {
      description: "Manage Applications"
    }
  },

  subroute: function () {
    var routes = this.get('routes'),
        route  = routes[this.get('controllers.application.currentPath')];
    return (route) ? route.description : null;
  }.property('controllers.application.currentPath')
});