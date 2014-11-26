'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var TagSchema = new Schema({
  name: String,
  canonical: ObjectId,
  description: [{
    text: String,
    added: Number, // UTC time
    author: ObjectId
  }],
  updated: [{
    by: ObjectId,
    at: Number, // UTC time
    fields: [String]
  }]
});

module.exports = mongoose.model('Tag', TagSchema);
