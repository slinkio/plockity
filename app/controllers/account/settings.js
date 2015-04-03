import Ember from 'ember';

export default Ember.Controller.extend({
  notAllowChangePassword: Ember.computed.not('allowChangePassword'),
  allowChangePassword:    Ember.computed.and('newPassword', 'newPasswordConfirm', 'passwordConfirmed'),

  passwordConfirmed: function () {
    return this.get('newPassword') === this.get('newPasswordConfirm');
  }.property('newPassword', 'newPasswordConfirm'),

  _saveChanges: function () {
    return this.get('model').save();
  },

  actions: {
    changePassword: function () {
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
        _end(null, 'Password successfully changed.');
      }).catch(_end);
    }
  }
});
