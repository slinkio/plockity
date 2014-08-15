import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty(prop);
    },

    deletePaymentMethod: function () {
      var paymentMethod = this.get('content'),
          currentUser   = this.session.get('currentUser.content');

      if( !confirm('Are you sure you want to delete ' + paymentMethod.get('name') + '?') ) {
        return;
      }

      currentUser.get('paymentMethod').then(function ( paymentMethods ) {

        paymentMethods.removeObject(paymentMethod.get('id'));

        paymentMethod.destroyRecord();

        currentUser.save();

      }, handleError);

      var handleError = function ( res ) {
        console.error( res );
      };

    }
  }
});
