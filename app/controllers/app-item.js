import Ember from 'ember';

export default Ember.Controller.extend({
  isEditingDidChange: function () {
    if(this.get('isEditing')) {
      this.set('showingDetails', false);
    }
  }.observes('isEditing'),

  actions: {
    toggleProperty: function (prop) {
      this.toggleProperty(prop);
    }
  }
});