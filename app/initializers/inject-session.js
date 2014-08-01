export default {
  name: 'inject-session',
  after: 'inject-store-session',

  initialize: function(container, app) {
    app.deferReadiness();
    console.debug("Injecting session:current");
    var store    = container.lookup('store:main'),
        sescon   = container.lookup('session:current'),
        s        = [];

    store.find('session').then(function (sessions) {
      console.debug("sessions", sessions);
      sessions.forEach(function (session) {
        console.debug("in session");
        if( moment( session.get('expires'), "YYY/MM/DD HH:mm:ss" ).isAfter( moment() ) ) {
          console.debug("session is active");
          if(s.length < 1) {
            return s.push(session);
          }
        }
        // Delete duplicate, old sessions
        session.destroyRecord();
      });
      console.debug("done iterating");
      if(s[0]) {
        console.debug("have session");
        sescon.set('content', s[0]);
        console.debug("set");
      }
      console.debug("injecting");
      container.typeInjection('controller', 'session', 'session:current');
      container.typeInjection('route', 'session', 'session:current');
      container.typeInjection('component', 'session', 'session:current');
      app.advanceReadiness();
    });
  }
};
