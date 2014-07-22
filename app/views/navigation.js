import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'nav',
  templateName: 'navigation',
  classNames: [ 'navbar', 'navbar-default', 'app-nav' ],
  attributeBindings: [ 'role:role' ],
  role: 'navigation'
});