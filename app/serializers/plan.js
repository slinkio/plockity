import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeHash: {
    plan: function (hash) {
      console.log('normalizing hash->plan');
      hash.id = hash._id;

      delete hash.__v;
      delete hash._id;
      console.log(hash);
      return hash;
    }
  }
});