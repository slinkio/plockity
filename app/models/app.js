import DS from 'ember-data';

var attribute = DS.attr;

export default DS.Model.extend({
  creator: DS.belongsTo('user')
});