import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  name: attribute('string'),
  url:  attribute('string'),

  usingDefault: attribute('boolean'),
  requestsMade: attribute('number'),
  apiKey:       attribute('string'),

  // Relational
  plan:           DS.belongsTo('plan'),
  creator:        DS.belongsTo('user', { async: true }),
  paymentMethod:  DS.belongsTo('payment-method'),
  subscriptionId: attribute('string'),
  subscription:   attribute(),

  // System
  time_stamp: attribute('date', {
    defaultValue: function () {
      return new Date();
    }
  })
});
