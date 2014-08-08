export default {
  name: 'inject-session',
  after: 'inject-store-session',

  initialize: function(container, app) {
    app.deferReadiness();
    console.debug("Injecting session:current");
    var store  = container.lookup('store:main'),
        sescon = container.lookup('session:current'),
        s;

    store.find('session').then(function (sessions) {
      console.debug("sessions", sessions);
      sessions.forEach(function (session) {
        console.debug("in session");
        console.log("Session expiration", session.get('expires'));
        if( moment( session.get('expires'), "YYYY/MM/DD HH:mm:ss" ).isAfter( moment() ) ) {
          console.debug("session is active");
          s = session;
        } else {
          // Delete duplicate, old sessions
          session.destroyRecord();
        }
        
      });
      console.debug("done iterating");
      if(s) {
        console.debug("have session");
        sescon.set('content', s);
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
