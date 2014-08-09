import Ember from 'ember';

var Router = Ember.Router.extend({
  location: PlockityENV.locationType
});

Router.map(function() {
  this.route('prototypes');
  
  this.resource('account', { path: 'my-account' }, function () {
    this.route('index', { path: '/' });
    this.route('apps', { path: 'applications' });
    this.route('billing');
    this.route('settings');
  });

  this.route('login');
  
  this.route('contact');
});

export default Router;