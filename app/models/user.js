import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  // Statics
  firstName:   attribute('string'),
  lastName:    attribute('string'),
  companyName: attribute('string'),
  password:    attribute('string'),
  email:       attribute('string'),
  
  // Relational
  app: DS.hasMany('app', { async: true }),
  paymentMethod: DS.hasMany('paymentMethod', { async: true }),

  // Computed
  fullName: function () {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName'),

  isAdmin: function () {
    // Just used for visual layout
    return this.get('type') === 'admin';
  }.property('type'),

  // System
  type: attribute('string'),
  time_stamp: attribute('string', {
    defaultValue: function () {
      return moment().format("YYYY/MM/DD HH:mm:ss");
    }
  })
});
