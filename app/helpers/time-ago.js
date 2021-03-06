import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function (timeStamp) {
  var timeagoMoment = moment(timeStamp, "YYYY/MM/DD HH:mm:ss");

  return timeagoMoment.fromNow();
});