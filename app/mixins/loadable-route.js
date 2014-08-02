import Ember from 'ember';

export default Ember.Mixin.create({
  beforeModel: function () {
    this.globals.progress.start();

    this._super.apply(this, arguments);
  },

  afterModel: function () {
    this.globals.progress.inc();
    
    Ember.run.scheduleOnce('afterRender', this, function () {
      this.globals.progress.done();
    });

    this._super.apply(this, arguments);
  }
});