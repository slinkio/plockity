import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  name:    attribute('string'),
  domain:  attribute('string'),

  // Relational
  plan:           DS.belongsTo('plan'),
  creator:        DS.belongsTo('user', { async: true }),
  paymentMethod:  DS.belongsTo('payment-method'),
  subscriptionId: attribute('string'),
  subscription:   attribute(),

  // System
  time_stamp: attribute('string', {
    defaultValue: function () {
      return moment().format("YYYY/MM/DD HH:mm:ss");
    }
  })
});
