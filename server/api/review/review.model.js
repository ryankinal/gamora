'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var ReviewSchema = new Schema({
  title: String,
  rating: {type: Number, min: 1, max: 5 },
  difficulty: {type: Number, min: 1, max: 5 },
  length: Number,
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
