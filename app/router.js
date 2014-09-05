import Ember from 'ember';

var Router = Ember.Router.extend({
  location: PlockityENV.locationType
});

Router.map(function() {
  this.route('login');
  this.route('contact');

  this.resource('account', { path: 'my-account' }, function () {
    this.route('index', { path: '/' });
    this.route('apps', { path: 'applications' });
    this.route('billing');
    this.route('settings');
  });

  this.resource('admin', { path: 'administration' }, function () {
    this.route('index', { path: '/' });
    this.route('plans', { path: 'manage-plans' });
    this.route('users', { path: 'users' });
    this.route('settings', { path: 'settings' });
  });
});

export default Router;
