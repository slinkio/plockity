import Ember from 'ember';

export default Ember.ArrayController.extend({
  notAllowSubmit: Ember.computed.not('allowSubmit'),

  features: [],

  allowSubmit: function () {
    var d = this.getProperties('price', 'description', 'tagline', 'title', 'features', 'maxRequests', 'loading');

    return ( d.description && d.tagline && d.title && d.maxRequests && d.features && d.features.length > 0 && !d.loading );
  }.property('price', 'description', 'tagline', 'title', 'features.@each', 'loading'),

  priceGtZero: function () {
    return parseFloat( this.get('price') ) > 0;
  }.property('price'),

  actions: {
    addFeature: function () {
      var f = this.get('featureToAdd');

      if( f ) {
        this.get('features').addObject( f );
        this.set('featureToAdd', null);
      }
    },

    removeFeature: function ( feature ) {
      this.get('features').removeObject( feature );
    },

    createPlan: function () {
      var self = this,
          notAllowSubmit = this.get('notAllowSubmit');

      this.setProperties({
        formStatus: null,
        loading:    true
      });

      if(notAllowSubmit) {
        return this.setProperties({
          formStatus: {
            type: 'danger',
            msg:  'Missing information to create plan.'
          },
          loading: false
        });
      }

      var data = this.getProperties('price', 'description', 'tagline', 'title', 'features', 'maxRequests');

      var plan = this.store.createRecord('plan', data);

      plan.save().then(function ( /* record */ ) {

          self.send('hideModal', 'add-plan-modal');

          self.setProperties({
            parsedAppError: null,
            loading:        false,
            appDomain:      null,
            appName:        null,
            plan:           null
          });

      }, function (res) {
        console.error(res);
        var ext = (res && res.statusText) ? ": " + res.statusText : ".";
        self.setProperties({
          formStatus: {
            type: "danger",
            msg: "There was an error creating the plan" + ext
          },
          loading: false
        });
      });
    }
  }
});
