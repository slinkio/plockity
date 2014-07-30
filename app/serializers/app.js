import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeHash: {
    app: function (hash) {
      hash.id = hash._id;

      delete hash.__v;
      delete hash._id;

      return hash;
    }
  },
});