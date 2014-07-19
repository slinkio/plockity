/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use this to add additional libraries to the generated output files.
app.import({
  development: 'vendor/ember-data/ember-data.js',
  production:  'vendor/ember-data/ember-data.prod.js'
});

/* Vendor CSS */
app.import('vendor/fontawesome/css/font-awesome.css');

/* Vendor JS */
app.import('vendor/bootstrap/dist/js/bootstrap.min.js');
app.import('vendor/moment/moment.js');

module.exports = app.toTree();