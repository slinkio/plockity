import Ember from 'ember';

export default Ember.Controller.extend({
  notAllowChangePassword: Ember.computed.not('allowChangePassword'),
  allowChangePassword:    Ember.computed.and('newPassword', 'newPasswordConfirm', 'passwordConfirmed', 'notSavingPassword'),
  notSavingPassword:      Ember.computed.not('savingPassword'),

  passwordConfirmed: function () {
    return this.get('newPassword') === this.get('newPasswordConfirm');
  }.property('newPassword', 'newPasswordConfirm'),

  _saveChanges: function () {
    return this.get('model').save();
  },

  actions: {
    cancelAccount: function () {
      if ( !confirm('Are you sure you want to cancel your account? This will delete ALL of your Apps, Data, and your Account. This action is not recoverable.') ) {
        return;
      }

      var self = this;

      this.get('model').destroyRecord().then(function () {
        self.session.logout();
      });
    },

    changePassword: function () {
      this.set('passwordSuccess', null);

      if ( !this.get('allowChangePassword') ) {
        return;
      }

      var self = this;

      var _end = function ( err, successMessage ) {
        var errMsg = ( err && err.responseText ) ? err.responseText : err;

        if ( err ) {
          console.error(err);
        }

        self.setProperties({
          passwordError:   errMsg,
          savingPassword:  false,
          passwordSuccess: successMessage
        });
      };

      this.get('model').set('password', this.get('newPassword'));

      this._saveChanges().then(function ( /* result */ ) {
        self.setProperties({
          newPassword: null,
          newPasswordConfirm: null
        });
        _end(null, 'Password successfully changed.');
      }).catch(_end);
    }
  }
});
