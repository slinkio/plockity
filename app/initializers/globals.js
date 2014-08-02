import AppGlobals from '../globals/app';

export default {
  name: 'globals',
  after: 'inject-store-session',

  initialize: function(container, app) {
    app.deferReadiness();
    
    container.register('globals:app', AppGlobals.extend(), { singleton: true });
    
    var store   = container.lookup('store:main'),
        globcon = container.lookup('globals:app');

    var plans   = store.find('plan');
    
    globcon.set('plans', plans);

    container.typeInjection('route', 'globals', 'globals:app');
    container.typeInjection('component', 'globals', 'globals:app');

    app.advanceReadiness();
  }
};
