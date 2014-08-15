import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  normalizeHash: {
    paymentMethod: function (hash) {
      hash.id = hash._id;
      hash.user = hash.customerId;

      if( hash.address ) {
        hash.addressLine1 = hash.address.line1;
        hash.addressLine2 = hash.address.line2;
        hash.city = hash.address.city;
        hash.state = hash.address.state;
        hash.zipcode = hash.address.zipcode;
      }

      delete hash.address;
      delete hash.customerId;
      delete hash.__v;
      delete hash._id;

      return hash;
    }
  },
  serialize: function (pM) {
    var json = {
      name: pM.get('name'),
      isDefault: pM.get('isDefault'),

      customerId: pM.get('user.id'),
      app:        pM.get('app').mapProperty('id'),

      address: {
        line1: pM.get('addressLine1'),
        line2: pM.get('addressLine2'),
        city:  pM.get('city'),
        state: pM.get('state'),
        zipcode: pM.get('zipcode')
      },

      nonce: pM.get('nonce'),

      time_stamp: pM.get('time_stamp')
    };

    return json;
  }
});
