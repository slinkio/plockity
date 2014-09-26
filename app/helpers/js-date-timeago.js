import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function (timeStamp) {
  return moment( timeStamp ).fromNow();
});
