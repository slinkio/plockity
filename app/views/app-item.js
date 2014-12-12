import Ember from 'ember';
import TooltipMixin from 'plockity/mixins/render-tooltips';

export default Ember.View.extend(TooltipMixin, {
  templateName: 'app-item',
  classNames: [ 'list-group-item', 'app-item-view' ],
  classNameBindings: [ 'controller.isEditing:expand', 'controller.isAssigningMethod:expand', 'controller.confirmDelete:expand-sm' ]
});