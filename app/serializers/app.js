import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    plan: { embedded: 'always' }
  },
  normalizeHash: {
    app: function (hash) {
      hash.id = hash._id;

      delete hash.__v;
      delete hash._id;

      if(hash.plan && hash.plan._id) {
        hash.plan.id = hash.plan._id;

        delete hash.plan._id;
        delete hash.plan.__v;
      }

      return hash;
    },
    apps: function (hash) {
      hash.id = hash._id;

      delete hash.__v;
      delete hash._id;

      if(hash.plan && hash.plan._id) {
        hash.plan.id = hash.plan._id;

        delete hash.plan._id;
        delete hash.plan.__v;
      }

      return hash;
    }
  },
  serialize: function (app) {
    var json = {
      _id:        app.get('id'),
      name:       app.get('name'),
      domain:     app.get('domain'),
      creator:    app.get('creator').get('id'),
      plan:       app.get('plan').get('id'),
      paymentMethod: app.get('paymentMethod').get('id'),
      time_stamp: app.get('time_stamp')
    };

    return json;
  }
});