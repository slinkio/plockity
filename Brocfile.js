/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use this to add additional libraries to the generated output files.
app.import({
  development: 'vendor/ember-data/ember-data.js',
  production:  'vendor/ember-data/ember-data.prod.js'
});

/* Ember Data Adapter */
app.import('vendor/ember-localstorage-adapter/localstorage_adapter.js');

/* Vendor CSS */
app.import('vendor/fontawesome/css/font-awesome.css');
app.import('vendor/nprogress/nprogress.css');

/* Vendor JS */
app.import('vendor/bootstrap/dist/js/bootstrap.min.js');
app.import('vendor/moment/moment.js');
app.import('vendor/nprogress/nprogress.js');
app.import('vendor/braintree-encryption.js/target/braintree-1.3.10.js');

module.exports = app.toTree();