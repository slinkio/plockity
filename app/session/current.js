import Ember from 'ember';

export default Ember.Object.extend({

  contentDidChange: function () {
    console.debug("Session did change");
    
    if(this.get('content.token')) {
      console.debug("setting up header");

      var headers = this.get('content').getProperties('token', 'user');

      this._setupHeaders(headers.token, headers.user);
      this._populateUser();
      this.set('authenticated', true);
    } else {
      this.set('authenticated', false);
    }
  }.observes('content'),

  logout: function () {
    var self = this;

    console.debug("logging out");
    
    // Find the session
    this.store.find('session', this.get('content.id')).then(function (session) {
      // Delete the session
      session.destroyRecord();
      // Reset props
      self.setProperties({
        authenticated: false,
        content: null,
        currentUser: null
      });
    });

    Ember.$.ajaxSetup({
      headers: {
        'Session': null
      }
    });
  },
  
  login: function (data) {
    console.debug("logging in");

    var self = this;

    this.setProperties({
      loggingIn: true,
      loginError: null
    });

    Ember.assert('Session#login must have data object to pass to api#login', typeof data === 'object');

    Ember.$.post('/api/login', data).then(function (res) {
      var session = self.store.createRecord('session', {
        token:   res.token,
        expires: res.expires,
        user:    res.user
      });

      session.save();

      self.setProperties({
        content: session,
        authenticated: true,
        loggingIn: false
      });
    }, function (res) {
      self.setProperties({
        authenticated: false,
        loginError: res,
        loggingIn: false
      });
    });
  },
  
  _setupHeaders: function (token, user) {
    Ember.assert('Session must have token & user [id] to setup headers', ( token && user ));

    Ember.$.ajaxSetup({
      headers: {
        'Session': token,
        'User':    user
      }
    });
  },

  _populateUser: function () {
    Ember.assert('Session must have user id to fetch currentUser', this.get('content.user'));

    this.set('currentUser', this.store.find('user', this.get('content.user')));
  },

  generateBraintreeToken: function (context, callback) {
    Ember.assert('Session must have currentUser to generate Braintree token', this.get('currentUser.id'));

    Ember.$.get('/api/transaction/token', { user: this.get('currentUser.id') }).then(function (res) {
      console.debug("got token res", res);
      var err   = res.error || null,
          token = res.token || null;
      console.debug("applying with token", token);

      callback.apply(context, [err, token]);
    }, function (res) {
      callback.apply(context, res);
    });
  }
});