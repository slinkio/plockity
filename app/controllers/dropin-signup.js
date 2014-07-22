import Ember from 'ember';
import { emailRegexp } from '../utils/regex-validators';

export default Ember.Controller.extend({
  emailIsNotValid: Ember.computed.not('emailIsValid'),
  passwordsDoNotMatch: Ember.computed.not('passwordsMatch'),

  emailIsValid: function () {
    return emailRegexp.test(this.get('email'));
  }.property('email'),

  passwordsMatch: function () {
    var pass = this.get('password');
    return (pass && pass.length > 5 && pass === this.get('passwordre'));
  }.property('password', 'passwordre'),

  actions: {
    prelimSignup: function () {
      var self = this;

      $.getJSON('/api/check-email/user/', { email: self.get('email') }).then(function (res) {
        if(res.status === "ok") {
          self.set('requestingPassword', true);
          Ember.run.scheduleOnce('afterRender', this, function () {
            $('[name="dropin-password"]').focus();
          });
        } else {
          self.set('formStatus', {
            type: "danger",
            msg: "Sorry! That email is already signed up with us."
          });
        }
      });
    },
    backToEmail: function () {
      this.set('requestingPassword', false);
      Ember.run.scheduleOnce('afterRender', this, function () {
        $('[name="dropin-email"]').focus();
      });
    }
  }
});