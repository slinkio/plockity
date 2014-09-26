import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function ( timeStamp, pattern ) {
  pattern = ( typeof pattern === 'string') ? pattern : "MM/DD/YYYY";

  return moment( timeStamp ).format( pattern );
});
