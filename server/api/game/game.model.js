'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var GameSchema = new Schema({
  title: {type: String, required: true, trim: true, index: { unique: true }},
  publisher: { type: String, trim: true },
  aliases: [{type: String, trim: true}],
  description: [{
    text: String,
    updated: { type: Date, default: Date.now },
    user: ObjectId
  }],
  rating: { type: Number, min: 1, max: 5 },
  tags: [{
    tag: ObjectId,
    added: { type: Date, default: Date.now },
    user: ObjectId
  }],
  updated: [{
    by: ObjectId,
    at: { type: Date, default: Date.now },
    fields: [String]
  }],
  active: Boolean
});

module.exports = mongoose.model('Game', GameSchema);
