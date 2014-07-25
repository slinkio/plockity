import Ember from 'ember';

var Router = Ember.Router.extend({
  location: PlockityENV.locationType
});

Router.map(function() {
  this.route('prototypes');
  this.resource('account', { path: 'my-account' }, function () {
    this.route('index', { path: '/' });
    this.route('apps', { path: 'applications' });
  });
});

export default Router;