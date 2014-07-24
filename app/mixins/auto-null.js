import Ember from 'ember';

export default Ember.Mixin.create({
  nullify: function (value, time) {
    this.set('nullify_time_' + value, time * 1000);
    this.addObserver(value, this, this._setNull);
  },
  removeNullify: function (value) {
    this.removeObserver(value, this, this._setNull);
  },
  _setNull: function (sender, key, value) {
    var t = this.get('nullify_time_' + key) || 1000,
        extTimeout = this.get('nullify_timeout_' + key),
        context = this;

    if(extTimeout) {
      clearTimeout(extTimeout);
    }

    this.set('nullify_timeout_' + key, setTimeout(function () {
      if(value !== null || value !== undefined) {
        context.set(key, null);
      }
    }, t));

  }
});