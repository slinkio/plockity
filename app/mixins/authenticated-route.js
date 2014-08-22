import Ember from 'ember';

export default Ember.Mixin.create({
  beforeModel: function ( transition ) {
    if(!this.get('session.authenticated')) {

      this.controllerFor('login').setProperties({
        savedTransition: transition,
        transitionError: 'Please login before proceeding to this page.'
      });

      return this.transitionTo('login');
    }

    this._super();

    var self = this;

    // return a promise if currentUser is not populated.
    return this.session.get('currentUser').then(function ( user ) {
      if( self.get('adminOnly') === true && !user.get('isAdmin') ) {
        self.transitionTo('index');
      }
    });
  },

  authenticationChanged: function () {
    if(!this.session.get('authenticated')) {
      this.transitionTo('index');
    }
  }.observes('this.session.authenticated')
});
