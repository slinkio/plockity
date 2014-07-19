import Ember from 'ember';

var Router = Ember.Router.extend({
  location: PlockityENV.locationType
});

Router.map(function() {
  this.route('prototypes');
});

export default Router;