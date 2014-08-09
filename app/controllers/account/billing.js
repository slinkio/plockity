import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    processBilling: function () {
      var nonce = this.get('paymentNonce');
      
      if( !nonce ) {
        // Braintree dropin UI does the form error handling if there is no paymentNonce
        return;
      }

      var paymentMethodData = this.getProperties('addressLine1', 'addressLine2', 'city', 'state', 'zipcode', 'name');

      // Set the pre-retrieved nonce
      paymentMethodData.nonce = nonce;

      var paymentMethod = this.store.createRecord('payment-method', paymentMethodData);

      paymentMethod.save.then(function (PaymentMethod) {

      });

    }
  }
});
