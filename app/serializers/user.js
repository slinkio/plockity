import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeHash: {
    user: function (hash) {
      hash.id    = hash._id;
      hash.email = hash.login.email;
      
      if(hash.name) {
        hash.firstName   = hash.name.first;
        hash.lastName    = hash.name.last;
        hash.companyName = hash.name.company;
      }

      delete hash.name;
      delete hash.login;
      delete hash.__v;
      delete hash._id;

      return hash;
    }
  },
  serialize: function (user) { // Options param available
    console.debug("record", user.get('app'));
    console.debug("typeof app", typeof user.get('app'));

    var json = {
      _id:        user.get('id'),
      name: {
        first:    user.get('firstName'),
        last:     user.get('lastName'),
        company:  user.get('companyName')
      },
      login: {
        email:    user.get('email'),
        password: user.get('password')
      },
      app:        user.get('app').mapProperty('id'),
      paymentMethod: user.get('paymentMethod').mapProperty('id'),
      time_stamp: user.get('time_stamp')
    };
    console.debug("payload", json);
    return json;
  }
});