import Session from '../session/current';

export default {
  name: 'session',
  after: 'store',

  initialize: function (container, app) {
    app.deferReadiness();
    console.debug("Registering session:current");
    container.register('session:current', Session.extend(), { singleton: true });
    app.advanceReadiness();
  }
};