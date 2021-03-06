import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function ( timeStamp, pattern ) {
  pattern = ( typeof pattern === 'string') ? pattern : "MM/DD/YYYY";

  return moment( timeStamp, "YYYY/MM/DD HH:mm:ss" ).format( pattern );
});
