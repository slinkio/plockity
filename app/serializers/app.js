import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    plan: { embedded: 'always' },
    paymentMethod: { serialize: 'ids', deserialize: 'records' }
  },

  normalizeHash: {
    app: function ( hash ) {
      hash.id = hash._id;

      delete hash.__v;
      delete hash._id;

      if(hash.plan && hash.plan._id) {
        hash.plan.id = hash.plan._id;

        delete hash.plan._id;
        delete hash.plan.__v;
      }

      if(hash.paymentMethod && hash.paymentMethod._id) {
        hash.paymentMethod.id = hash.paymentMethod._id;

        delete hash.paymentMethod._id;
        delete hash.paymentMethod.__v;
      }

      console.log(hash);

      return hash;
    }
  },

  serialize: function (app) {
    var json = {
      _id:        app.get('id'),
      name:       app.get('name'),
      domain:     app.get('domain'),
      creator:    app.get('creator.id'),
      plan:       app.get('plan.id'),
      paymentMethod: app.get('paymentMethod.id'),
      time_stamp: app.get('time_stamp')
    };

    return json;
  }
});