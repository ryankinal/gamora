'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var FlagSchema = new Schema({
  by: ObjectId,
  at: Number,
  item: ObjectId,
  valid: {type: Boolean, default: false}
});

FlagSchema.methods = {
  filters: function(query) {

  }
};

module.exports = mongoose.model('Flag', FlagSchema);
