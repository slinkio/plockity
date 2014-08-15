import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  // Relational
  user:   DS.belongsTo('user'),
  app:    DS.hasMany('app'),

  // Billing Data
  name:         attribute('string'), // This is the customer-friendly payment name
  addressLine1: attribute('string'),
  addressLine2: attribute('string'),
  city:         attribute('string'),
  state:        attribute('string'),
  zipcode:       attribute('string'),

  // Options
  isDefault:    attribute('boolean'),

  // Server does not return this value
  nonce:        attribute('string'),

  // System
  methodError:  attribute('string'),

  time_stamp: attribute('string', {
    defaultValue: function () {
      return moment().format("YYYY/MM/DD HH:mm:ss");
    }
  })
});
