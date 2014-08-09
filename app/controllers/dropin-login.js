import Ember from 'ember';
import { emailRegexp } from '../utils/regex-validators';

export default Ember.Controller.extend({
  notAllowSubmit: Ember.computed.not('allowSubmit'),

  allowSubmit: function () {
    return ( emailRegexp.test(this.get('email')) && this.get('password') && this.get('password').length > 2 && !this.get('session.loggingIn') );
  }.property('email', 'password', 'session.loggingIn'),

  parsedLoginError: function () {
    var e = this.get('session.loginError');
    if(!e) {
      return null;
    }
    return (e.status === 404) ? "No user found with that email. Please try again." : (e.status === 401) ? "Wrong password for that user. Please try again." : "Problem communicating with server, please try again. <br /><span class='text-muted'>" + e.responseText + "</span>";
  }.property('session.loginError'),

  authenticationChanged: function () {
    if(!this.session.get('authenticated') || !this.session.get('didSetHeaders')) {
      return;
    }
    this.setProperties({
      email:    null,
      password: null
    });
    // Hide the login modal
    this.send("hideModal", "login-modal");
  }.observes('session.authenticated', 'session.didSetHeaders'),

  actions: {
    login: function () {
      console.debug("handling login");
      var l = this.getProperties('email', 'password');
      if(l.email && l.password) {
        this.session.login(l);
      }
    }
  }
});