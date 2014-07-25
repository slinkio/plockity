import Ember from 'ember';
import AuthenticatedRouteMixin from 'plockity/mixins/authenticated-route';

module('AuthenticatedRouteMixin');

// Replace this with your real tests.
test('it works', function() {
  var AuthenticatedRouteObject = Ember.Object.extend(AuthenticatedRouteMixin);
  var subject = AuthenticatedRouteObject.create();
  ok(subject);
});
