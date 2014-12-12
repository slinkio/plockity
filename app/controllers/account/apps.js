import Ember from 'ember';

export default Ember.Controller.extend({
  notAllowSubmit: Ember.computed.not('allowSubmit'),

  entries: [
    {
      _valName: 'appDomain',
      format: function (v) {
        return (v) ? 'http://' + v.toLowerCase().replace(/(\S.*\:\/\/)/gi, '').replace(/\s/g, '') : v;
      }
    }
  ],

  entryDidChange: function () {
    Ember.run.once(this, this.formatEntries);
  }.observes(
    'appName',
    'appDomain'
  ),

  formatEntries: function () {
    var entries = this.get('entries'),
        self    = this;

    entries.forEach(function (entry) {
      if( typeof entry.format === "function" ) {
        return self.set(entry._valName, entry.format(self.get(entry._valName)));
      }
    });
  },

  showPlans: function () {
    return ( this.get('appName') && this.get('appDomain') );
  }.property('appName', 'appDomain'),

  allowSubmit: function () {
    var data = this.getProperties('appName', 'appDomain', 'plan', 'loading');
    // Return data validity
    return ( data.appName && data.appDomain && data.plan && data.plan.get('id') && !data.loading );
  }.property('appName', 'appDomain', 'plan', 'loading'),

  actions: {
    createApp: function () {
      var self           = this,
          notAllowSubmit = this.get('notAllowSubmit'),
          currentUser    = this.session.get('currentUser.content');

      this.setProperties({
        formStatus: null,
        loading:    true
      });

      if( notAllowSubmit ) {
        return this.setProperties({
          formStatus: {
            type: 'danger',
            msg:  'Missing information to create app.'
          },
          loading: false
        });
      }
      
      var data = this.getProperties('appName', 'appDomain', 'plan');

      console.debug( this.session.get('currentUser.content') );

      var app = this.store.createRecord('app', {
        name:    data.appName,
        url:     data.appDomain,
        creator: currentUser,
        plan:    data.plan
      });

      app.save().then(function (app) {
        console.log(app);

        currentUser.get('app').then(function ( apps ) {
          apps.addObject(app);

          // Workaround for hasMany issue :: See https://github.com/emberjs/data/pull/1535
          // This grabs the app before saving currentUser
          currentUser.get('paymentMethod').then(function ( /* records */ ) {

            currentUser.save().then(function () {

              self.send('hideModal', 'add-app-modal');

              self.setProperties({
                parsedAppError: null,
                loading:        false,
                appDomain:      null,
                appName:        null,
                plan:           null
              });
            }, handleError); // currentUser.save()
          }, handleError); // currentUser.get('paymentMethod')
        }, handleError); // currentUser.get('app')
      }, handleError); // app.save()

      var handleError = function (res) {
        console.error(res);
        var ext = (res && res.statusText) ? ": " + res.statusText : ".";
        self.setProperties({
          formStatus: {
            type: "danger",
            msg: "There was an error creating your app" + ext
          },
          loading: false
        });
      };
    }
  }
});