import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  active: function () {
    return moment(this.get('expires'), "YYY/MM/DD HH:mm:ss").isAfter(moment());
  }.property('expires'),

  token:   attribute('string'),
  expires: attribute('string'),
  user:    attribute('string') // Has to be a plain text id, we populate the session, and update headers before getting the user
});