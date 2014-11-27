'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var ReviewSchema = new Schema({
  title: String,
  rating: Number,
  difficulty: Number,
  length: Number,
  completed: Number, // 0 = no, 1 = yes, -1 = not applicable
  description: String,
  author: ObjectId,
  game: ObjectId,
  updated: [{
    by: ObjectId,
    at: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Review', ReviewSchema);
