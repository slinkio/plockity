import Ember from 'ember';

export default Ember.Controller.extend({
  entries: [
    {
      _valName: 'appDomain',
      format: function (v) {
        return (v) ? v.replace(/(\w+:\/\/|www\.|:\w+|^([-\w]+.)+)/g, '').toLowerCase().trim() : null;
      }
    }
  ],

  entryDidChange: function () {
    Ember.run.once(this, this.formatEntries);
  }.observes(
    'appName',
    'appDomain'
  ),

  formatEntries: function () {
    var entries = this.get('entries'),
        self = this;
    console.debug("entryDidChange");
    entries.forEach(function (entry) {
      console.debug("in entry", entry._valName);
      if(typeof entry.format === "function") {
        return self.set(entry._valName, entry.format(self.get(entry._valName)));
      }
    });
  }
});