'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var isInt = function isInt(val) {
  return typeof val === 'number' && Math.floor(val) === val;
};

var ReviewSchema = new Schema({
  title: String,
  rating: {type: Number, min: 1, max: 5, validator: isInt },
  difficulty: {type: Number, min: 1, max: 5, validator: isInt },
  length: {type: Number, min: 0, validator: isInt },
  completed: {type: Number, default: 0, validator: function(val) {
    return val === -1 || val === 0 || val === 1;
  }}, // 0 = no, 1 = yes, -1 = not applicable
  description: String,
  author: ObjectId,
  game: ObjectId,
  updated: [{
    by: ObjectId,
    at: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Review', ReviewSchema);
