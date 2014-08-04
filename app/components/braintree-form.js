import Ember from 'ember';

export default Ember.Component.extend({
  init: function () {
    this.session.generateBraintreeToken(this, function (err, token) {
      if(err) {
        return console.error(err);
      }
      console.debug("got token, setting", token);
      return this.set('token', token);
    });

    this._super();
  },

  didInsertElement: function () {
    Ember.assert('component:braintree-form must have .braintree-container in DOM', this.$().find('.braintree-container').length > 0);
  },

  tokenDidChange: function () {
    var token = this.get('token');

    console.debug("tokenDidChange");

    if(token) {
      var $container = this.$().find('.braintree-container');
      console.debug("Setting up container for braintree");
      console.debug("Have container jQuery object?", $container.length > 0);
      braintree.setup(token, 'dropin', {
        container: $container
      });
    }
  }.observes('token')
});