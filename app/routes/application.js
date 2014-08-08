import Ember from 'ember';

export default Ember.Route.extend({
  // Define Global Action Handlers
  actions: {
    error: function (err, transition) {
      console.error(err);

      if( err.status === 401 ) {
        this.session.logout();

        this.controllerFor('login').setProperties({
          savedTransition: transition,
          loginError: 'Please log in to continue...'
        });

        this.transitionTo('login');
      }
    },
    showModal: function (id, staticModal, forceAppend) {
      // Assign the modal element to a variable
      var el = $("#" + id);
      // If the forceAppend variable exists, we will append it to that identifer; useful for nested view modals
      if(forceAppend) {
        // Reassign the element
        el = el.appendTo(forceAppend);
      }
      // If we are going to be rendering this as a static, non-dismissable modal, set those properties
      if(staticModal) {
        el.modal({
            keyboard: false,
          backdrop: 'static'
        });
      }
      // Show the modal
      el.modal('show');
    },
    hideModal: function (id) {
      $("#" + id).modal('hide');
    },
    logout: function () {
      this.get('controller').session.logout();
    }
  }
});