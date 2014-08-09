import Ember from 'ember';

export default Ember.Mixin.create({
  beforeModel: function (transition) {
    console.debug("checking session");
    if(!this.get('session.authenticated')) {
      console.debug("not authenticated");
      this.controllerFor('login').setProperties({
        savedTransition: transition,
        transitionError: 'Please login before proceeding to this page.'
      });
      console.debug("set props, transitioning");
      return this.transitionTo('login');
    }

    this._super();

    // return a promise if currentUser is not populated.
    return this.session.get('currentUser');
  },
  authenticationChanged: function () {
    if(!this.session.get('authenticated')) {
      this.transitionTo('index');
    }
  }.observes('this.session.authenticated')
});