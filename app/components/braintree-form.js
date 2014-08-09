import Ember from 'ember';

export default Ember.Component.extend({
  init: function () {
    this._super();
    
    if(this.session.get('currentUser')) {
      this._generateToken();
    } else {
      this.set('waitForUser', true);
    }
  },

  didInsertElement: function () {
    Ember.assert('component:braintree-form must have .braintree-container in DOM', this.$().find('.braintree-container').length > 0);
  },

  _generateToken: function () {
    this.session.generateBraintreeToken(this, function (err, token) {
      if(err) {
        return console.error(err);
      }
      console.debug("got token, setting", token);
      return this.set('token', token);
    });
  },

  shouldGenerateToken: function () {
    if(this.get('waitForUser') && this.get('session.currentUser')) {
      this.set('waitForUser', false);
      this._generateToken();
    }
  }.observes('waitForUser', 'session.currentUser'),

  tokenDidChange: function () {
    var token = this.get('token');

    console.debug("tokenDidChange");

    if(token) {
      var $container = this.$().find('.braintree-container'),
          self       = this;
      console.log(self);

      braintree.setup(token, 'dropin', {
        container: $container,
        paymentMethodNonceReceived: function (event, nonce) {
          self.get('targetObject').set('paymentNonce', nonce);
        }
      });
    }
  }.observes('token')
});