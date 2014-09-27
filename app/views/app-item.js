import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'app-item',
  classNames: [ 'list-group-item', 'app-item-view' ],
  classNameBindings: [ 'controller.isEditing:expand', 'controller.isAssigningMethod:expand', 'controller.confirmDelete:expand-sm' ]
});