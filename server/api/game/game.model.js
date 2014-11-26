'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var GameSchema = new Schema({
  title: {type: String, required: true},
  publisher: String,
  aliases: [String],
  description: [{
    text: String,
    updated: Number, // UTC time
    user: ObjectId
  }],
  rating: Number,
  tags: [{
    tag: ObjectId,
    added: Number, // UTC time
    user: ObjectId
  }],
  updated: [{
    by: ObjectId,
    on: Number // UTC time
    fields: [String]
  }],
  active: Boolean
});

module.exports = mongoose.model('Game', GameSchema);
