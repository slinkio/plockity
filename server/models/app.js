/*
  App - Server Data Model
*/

var mongoose =   require('mongoose'),
    Schema =     mongoose.Schema,
    momentDate = require('../utils/moment-date');

var appSchema = new Schema({
  name:      String,
  creator:   ObjectId,
  purchased: {
    product: String,
    expiry:  String
  }
  requests:  Number,
  time_stamp: { type: String, default: new momentDate() }
});

module.exports = mongoose.model('App', appSchema);