const mongoose = require('mongoose');

const pincodeSchema = new mongoose.Schema({
  officeName: String,
  pincode: String,
  officeType: String,
  deliveryStatus: String,
  division: String,
  region: String,
  circle: String,
  taluk: String,
  district: String,
  state: String
});

module.exports = mongoose.model('Pincode', pincodeSchema);
