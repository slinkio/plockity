import Ember from 'ember';
import LoadableRouteMixin from 'plockity/mixins/loadable-route';

module('LoadableRouteMixin');

// Replace this with your real tests.
test('it works', function() {
  var LoadableRouteObject = Ember.Object.extend(LoadableRouteMixin);
  var subject = LoadableRouteObject.create();
  ok(subject);
});
