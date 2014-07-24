import Ember from 'ember';
import AutoNullMixin from 'plockity/mixins/auto-null';

module('AutoNullMixin');

// Replace this with your real tests.
test('it works', function() {
  var AutoNullObject = Ember.Object.extend(AutoNullMixin);
  var subject = AutoNullObject.create();
  ok(subject);
});
