import Ember from 'ember';
import AutoNullMixin from '../mixins/auto-null';
import { emailRegexp } from '../utils/regex-validators';
import { caseTitle, removeWhitespace as rws } from '../utils/text-tools';

export default Ember.Controller.extend(AutoNullMixin, {
  init: function () {
    this._super();
    this.nullify('formStatus', 5);
  },

  willDestroy: function () {
    this.removeNullify('formStatus');
  },

  emailIsNotValid: Ember.computed.not('emailIsValid'),
  doNotAllowSubmit: Ember.computed.not('allowSubmit'),

  formatting: {
    email: function (v) {
      return rws(v.toLowerCase());
    },
    firstName: function (v) {
      return rws(caseTitle(v));
    },
    lastName: function (v) {
      return rws(caseTitle(v));
    },
    companyName: function (v) {
      return caseTitle(v);
    }
  },

  allowSubmit: function () {
    var p = this.getProperties('secondFormIsValid', 'emailIsValid', 'loading');
    return ( p.secondFormIsValid && p.emailIsValid && !p.loading );
  }.property('secondFormIsValid', 'emailIsValid', 'loading'),

  secondFormIsValid: function () {
    return (this.get('passwordsMatch') && this.get('firstName') && this.get('lastName'));
  }.property('passwordsMatch', 'firstName', 'lastName'),

  emailIsValid: function () {
    return emailRegexp.test(this.get('email'));
  }.property('email'),

  passwordsMatch: function () {
    var pass = this.get('password');
    return (pass && pass.length > 5 && pass === this.get('passwordre'));
  }.property('password', 'passwordre'),

  valuesDidChange: function () {
    Ember.run.once(this, function () {
      var vals = this.getProperties('email', 'firstName', 'lastName', 'companyName'),
          formatting = this.get('formatting');
      
      for (var key in vals) {
        if(typeof formatting[key] === "function" && vals[key]) {
          vals[key] = formatting[key](vals[key]);
        }
      }

      this.setProperties(vals);
    });
  }.observes('email', 'firstName', 'lastName', 'companyName'),

  actions: {
    prelimSignup: function () {
      var self = this;
      $.getJSON('/api/check-email/user/', { email: self.get('email') }).then(function (res) {
        if(res.status === "ok") {
          self.set('requestingSecond', true);
          Ember.run.scheduleOnce('afterRender', this, function () {
            $('[name="dropin-name"]').focus();
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
      this.set('requestingSecond', false);
      Ember.run.scheduleOnce('afterRender', this, function () {
        $('[name="dropin-email"]').focus();
      });
    },

    completeSignup: function () {
      var self = this;
      if( this.get('allowSubmit') !== true ) {
        return this.setProperties({
          formStatus: {
            type: "danger",
            msg: "Please complete the form before submitting."
          },
          loading: false
        });
      }

      this.set('loading', true);
      
      var values = this.getProperties('firstName', 'lastName', 'companyName', 'password', 'email');
      
      var user = this.store.createRecord('user', values);

      user.save().then(function (user) {
        self.session.login( self.getProperties('email', 'password') );
        
        self.setProperties({
          formStatus: {
            type: "success",
            msg: "Thanks for signing up, " + user.get('firstName') + "."
          },
          loading:          false,
          firstName:        null,
          lastName:         null,
          companyName:      null,
          email:            null,
          password:         null,
          passwordre:       null,
          requestingSecond: false
        });
      }).catch(function (res) {
        console.error(res);
        var ext = (res.statusText) ? ": " + res.statusText : ".";
        self.setProperties({
          formStatus: {
            type: "danger",
            msg: "There was an error signing you up" + ext
          },
          loading: false
        });
      });
    }
  }
});