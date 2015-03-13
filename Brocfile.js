/* global require, module */

var EmberApp  = require('ember-cli/lib/broccoli/ember-app'),
    fs        = require('fs'),
    vendorDir = JSON.parse(fs.readFileSync('./.bowerrc')).directory + '/';

var app = new EmberApp({
  fingerprint: {
    replaceExtensions: ['html', 'js', 'css', 'less']
  },
});

var bowerIncludes = [
  'ember-localstorage-adapter/localstorage_adapter.js',
  'fontawesome/css/font-awesome.css',
  'nprogress/nprogress.css',
  'bootstrap/dist/js/bootstrap.min.js',
  'moment/moment.js',
  'nprogress/nprogress.js',
  'braintree/index.js',
  'velocity/velocity.js'
];

bowerIncludes.forEach(function ( path ) {
  app.import( vendorDir + path );
});

module.exports = app.toTree();
