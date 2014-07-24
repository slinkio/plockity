export default {
  name: 'inject-store-session',
  after: 'session',

  initialize: function(container) {
    console.debug("Injecting store:main into session");
    container.typeInjection('session', 'store', 'store:main');
  }
};
