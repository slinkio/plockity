import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    plan: { embedded: 'always' }
  },
  normalizeHash: {
    app: function (hash) {
      console.log('normalizing hash->app');
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
      console.log('normalizing hash->apps');
      console.log(hash);
      hash.id = hash._id;

      delete hash.__v;
      delete hash._id;

      if(hash.plan && hash.plan._id) {
        hash.plan.id = hash.plan._id;

        delete hash.plan._id;
        delete hash.plan.__v;
      }
      console.log(hash);
      return hash;
    },
    plan: function (hash) {
      console.log("NORMALIZING HASH BRO");
      return hash;
    }
  },
  serialize: function (app) {
    console.debug("apppayload", app);
    var json = {
      _id:        app.get('id'),
      name:       app.get('name'),
      domain:     app.get('domain'),
      creator:    app.get('creator').get('id'),
      plan:       app.get('plan').get('id'),
      time_stamp: app.get('time_stamp')
    };
    console.debug("payload", json);
    return json;
  }
});