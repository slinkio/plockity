import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    },

    deletePlan: function () {
      var plan = this.get('content');

      if( !confirm('Are you sure you want to delete the ' + plan.get('title') + ' plan?') ) {
        return;
      }

      plan.destroyRecord();
    }
  }
});
