var mongoose = require('mongoose');

var authorSchema = mongoose.Schema({
  ifsc: { type: String },
  bank_id: { type: String },
  branch: { type: String },
  address: { type: String },
  city: { type: String },
  district: { type: String },
  state: { type: String },
  bank_name: { type: String }
});

var User = mongoose.model('bankIfscCodes', authorSchema, 'bankIfscCodes');

module.exports = User;
