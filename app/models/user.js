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
  apps: DS.hasMany('app', {
    embedded: 'always'
  }),

  // Computed
  fullName: function () {
    return this.get('firstName') + ' ' + this.get('lastName');
  }.property('firstName', 'lastName'),

  // System
  time_stamp: attribute('string', {
    defaultValue: function () {
      return moment().format("YYYY/MM/DD HH:mm:ss");
    }
  })
});