import Ember from 'ember';

export default Ember.Controller.extend({
  notAllowSubmit: Ember.computed.not('allowSubmit'),

  isEditingDidChange: function () {
    if(this.get('isEditing')) {
      this.set('showingDetails', false);
    }
  }.observes('isEditing'),

  usingDefaultChanged: function () {
    if( this.get('content.isDirty') ) {
      this.send('saveEdits');
    }
  }.observes('content.usingDefault'),

  paymentMethods: function () {
    var appMethod = this.get('content.paymentMethod');

    return this.get('session.currentUser.paymentMethod').map(function ( method ) {
      method.assignedToApp = ( appMethod.id === method.id );

      return method;
    });
  }.property('session.currentUser.paymentMethod', 'content.paymentMethod'),

  allowSubmit: function () {
    var app  = this.get('content'),
        data = app.getProperties('name', 'domain', 'plan', 'isDirty');
    // Return data validity
    return (data.name && data.domain && data.plan && data.plan.get('id') && !this.get('loading') && data.isDirty);
  }.property('content.name', 'content.domain', 'content.plan', 'content.isDirty', 'loading'),

  actions: {
    toggleProperty: function ( prop ) {
      this.toggleProperty( prop );
    },

    saveEdits: function ( override ) {
      var self           = this,
          notAllowSubmit = this.get('notAllowSubmit'),
          app            = this.get('content');

      this.setProperties({
        formStatus: null,
        loading:    true
      });

      if( notAllowSubmit && !override ) {
        return this.setProperties({
          formStatus: {
            type: 'danger',
            msg:  'Missing information to save app.'
          },
          loading: false
        });
      }

      app.save().then(function () {
          self.setProperties({
            loading:   false,
            isEditing: false
          });
      }).catch(function ( res ) {
        console.error(res);
        var ext = (res && res.statusText) ? ": " + res.statusText : ".";
        self.setProperties({
          formStatus: {
            type: "danger",
            msg: "There was an error saving your app" + ext
          },
          loading: false
        });
      });
    },

    cancelEdits: function () {
      var app = this.get('content');

      console.log("isDirty?", app.get('isDirty'));

      if( app.get('isDirty') ) {
        app.rollback();
      }

      this.toggleProperty('isEditing');
    },

    deleteApp: function () {
      this.get('content').destroyRecord();
    },

    assignMethod: function ( method ) {
      this.get('content').set('paymentMethod', method);

      this.send('saveEdits', true);

      this.set('isAssigningMethod', false);
    }
  }
});