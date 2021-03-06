import Ember from 'ember';

export default Ember.Controller.extend({
  notAllowSubmit: Ember.computed.not('allowSubmit'),

  allowSubmit: function () {
    var d = this.getProperties('addressLine1', 'city', 'state', 'zipcode', 'name', 'loading');

    return ( d.addressLine1 && d.city && d.state && d.zipcode && d.name );
  }.property('addressLine1', 'city', 'state', 'zipcode', 'name', 'loading'),

  didGetNonce: function () {
    this.send('processBilling');
  }.observes('paymentNonce'),

  actions: {
    processBilling: function () {
      var nonce = this.get('paymentNonce');

      this.setProperties({
        formStatus: null,
        loading: true
      });
      
      if( !nonce ) {
        /*
          Braintree dropin UI does the form error handling
          if there is no paymentNonce. We only enter this
          action initially to set the formStatus to null
          and loading to true. This action is refired by
          didGetNonce.
        */
        return;
      }

      var paymentMethodData = this.getProperties('addressLine1', 'addressLine2', 'city', 'state', 'zipcode', 'name'),
          currentUser       = this.session.get('currentUser.content');
      console.debug('user->app before creating pm', currentUser.get('app'));
      // Set the pre-retrieved nonce
      paymentMethodData.nonce = nonce;
      // Should be able to get this sync, currentUser is already preloaded via AuthenticatedRouteMixin
      paymentMethodData.user = currentUser;

      var self = this;

      currentUser.get('paymentMethod').then(function ( PaymentMethods ) {
        if( PaymentMethods.findBy('nonce', nonce) ) {
          return self.setProperties({
            formStatus: {
              type: 'warning',
              msg: 'That payment method already exists'
            },
            loading: false
          });
        }

        var paymentMethod = self.store.createRecord('payment-method', paymentMethodData);

        paymentMethod.save().then(function ( PaymentMethod ) {
          // Add paymentMethod to user
          currentUser.get('paymentMethod').addObject( PaymentMethod );
          // Workaround for hasMany issue :: See https://github.com/emberjs/data/pull/1535
          // This grabs the app before saving currentUser
          currentUser.get('app').then(function (/* records */) {

            currentUser.save().then(function ( u ) {

              console.debug('user->app after creating pm', u.get('app'));

              self.send('hideModal', 'account-transaction-modal');

              self.setProperties({
                name: null,
                addressLine1: null,
                addressLine2: null,
                city: null,
                state: null,
                zipcode: null,
                loading: false
              });

            }, handleError);

          }, handleError);

        }, handleError);

      }, handleError);
      

      var handleError = function ( res ) {
        console.error(res);

        var ext = (res && res.statusText) ? ": " + res.statusText : ".";

        self.setProperties({
          formStatus: {
            type: "danger",
            msg: "There was an error adding your payment method" + ext
          },
          loading: false
        });
      };

    },

    makeDefault: function ( paymentMethod ) {
      var currentUser = this.session.get('currentUser.content');

      currentUser.get('paymentMethod').then(function ( paymentMethods ) {
        var defaultMethod = paymentMethods.findBy('isDefault', true);

        if( defaultMethod ) {
          defaultMethod.set('isDefault', false);

          defaultMethod.save();
        }

        paymentMethod.set('isDefault', true);

        paymentMethod.save();
      });
    }
  }
});
