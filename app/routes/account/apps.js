import Ember from 'ember';
import AuthenticatedRouteMixin from '../../mixins/authenticated-route';
import LoadableRouteMixin from '../../mixins/loadable-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, LoadableRouteMixin, {
  model: function () {
    return this.session.get('currentUser').get('app');
  }
});