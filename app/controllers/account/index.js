import Ember from 'ember';

export default Ember.Controller.extend({
  vaultCount: {},

  shouldCountVault: function () {
    var self = this;

    Ember.$.getJSON('/api/user/' + this.session.get('currentUser.id') + '/vault-count', function ( response ) {
      self.set('vaultCount', response);
    }, function ( err ) {
      console.error(err);
    });
  }.observes('session.currentUser').on('init')
});
