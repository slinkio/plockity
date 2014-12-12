import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    resetKey: function () {
      if( !confirm('Are you sure you want to reset your app key?\n\nYou will have to update your existing applications with the new key and the old key will not work!') ) {
        return;
      }

      this.setProperties({
        loading: true,
        keyError: null
      });

      var self = this,
          app  = this.get('app');

      Ember.$.getJSON('/api/apps/' + app.get('id') + '/reset-key').then(function () {
        self.setProperties({
          loading: false
        });

        app.reload(); // Refresh app
      }, function ( err ) {
        console.error(err);
        self.setProperties({
          loading: false,
          keyError: err
        });
      });
    }
  }
});
