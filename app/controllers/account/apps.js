import Ember from 'ember';

export default Ember.Controller.extend({
  notAllowSubmit: Ember.computed.not('allowSubmit'),

  entries: [
    {
      _valName: 'appDomain',
      format: function (v) {
        return (v) ? v.toLowerCase() : v;
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
        self = this;
    console.debug("entryDidChange");
    entries.forEach(function (entry) {
      console.debug("in entry", entry._valName);
      if(typeof entry.format === "function") {
        return self.set(entry._valName, entry.format(self.get(entry._valName)));
      }
    });
  },

  showPlans: function () {
    return (this.get('appName') && this.get('appDomain'));
  }.property('appName', 'appDomain'),

  allowSubmit: function () {
    var data = this.getProperties('appName', 'appDomain', 'plan', 'loading');
    // Return data validity
    return (data.appName && data.appDomain && data.plan && data.plan.get('id') && !data.loading);
  }.property('appName', 'appDomain', 'plan', 'loading'),

  actions: {
    createApp: function () {
      var self = this,
          notAllowSubmit = this.get('notAllowSubmit'),
          currentUser = this.session.get('currentUser.content');

      this.setProperties({
        formStatus: null,
        loading:    true
      });

      if(notAllowSubmit) {
        return this.setProperties({
          formStatus: {
            type: 'danger',
            msg:  'Missing information to create app.'
          },
          loading: false
        });
      }
      
      var data = this.getProperties('appName', 'appDomain', 'plan');

      console.debug(this.session.get('currentUser.content'));

      var app = this.store.createRecord('app', {
        name:    data.appName,
        domain:  data.appDomain,
        creator: currentUser,
        plan:    data.plan
      });

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

      app.save().then(function (app) {
        console.log(app);

        currentUser.get('app').addObject(app);
        currentUser.save().then(function () {

          self.send('hideModal', 'add-app-modal');

          self.setProperties({
            parsedAppError: null,
            loading:        false,
            appDomain:      null,
            appName:        null,
            plan:           null
          });

        }).catch(function (res) {
          handleError.apply(this, res);
        });
      }).catch(function (res) {
        handleError.apply(this, res);
      });
    }
  }
});