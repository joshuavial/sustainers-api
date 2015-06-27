const Schema = require('mongoose').Schema
module.exports = new Schema({
  address: String,
  lastNonce: Number
})
