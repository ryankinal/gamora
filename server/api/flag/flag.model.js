'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FlagSchema = new Schema({
  by: ObjectId,
  on: Number,
  item: ObjectId,
  invalid: {type: Boolean, default: false}
});

module.exports = mongoose.model('Flag', FlagSchema);
