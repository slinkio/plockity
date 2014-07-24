import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ "alert" ],
  classNameBindings: [ "prefixType", "dismissible:alert-dismissible", "dismissible:hide-slide", "dismiss::show" ],
  attributeBindings: [ "id" ],

  init: function () {
    this._super();

    var d = this.getProperties('autoDismiss', 'autoDismissSeconds');
    
    if(d.autoDismiss && !isNaN(d.autoDismissSeconds)) {
      Ember.run.scheduleOnce('afterRender', this, this.setDismiss(d.autoDismissSeconds));
    }
  },

  setDismiss: function (sec) {
    var self = this;

    setTimeout(function () {
      self.set('dismiss', true);
    }, sec * 1000);
  },

  prefixType: function () {
    return "alert-" + this.get('type');
  }.property('type'),
});