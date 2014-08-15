import Ember from 'ember';
import RenderTooltipsMixin from '../mixins/render-tooltips';

export default Ember.View.extend(RenderTooltipsMixin, {
  templateName: 'payment-method-item',
  classNames: [ 'list-group-item', 'payment-method-item-view' ]
});
