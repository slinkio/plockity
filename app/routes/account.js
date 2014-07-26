import Ember from 'ember';
import AuthenticatedRouteMixin from '../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function () {
    return this.session.currentUser;
  },
  authenticationChanged: function () {
    if(!this.session.get('authenticated')) {
      this.transitionToRoute('index');
    }
  }.observes('this.session.authenticated')
});