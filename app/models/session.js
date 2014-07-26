import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  token:   attribute('string'),
  expires: attribute('string'),
  user:    attribute('string') // Has to be a plain text id, we populate the session, and update headers before getting the user
});