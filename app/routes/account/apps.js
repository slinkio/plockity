import Ember from 'ember';
import AuthenticatedRouteMixin from '../../mixins/authenticated-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function () {
    return this.session.currentUser.get('app');
  }
});