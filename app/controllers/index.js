import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    triggerLogin: function () {
      this.session.login();
    },
    check:function () {
      this.session.check();
    }
  }
});