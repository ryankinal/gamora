'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var TagSchema = new Schema({
  name: String,
  canonical: ObjectId,
  description: [{
    text: String,
    added: { type: Date, default: Date.now },
    author: ObjectId
  }],
  updated: [{
    by: ObjectId,
    at: { type: Date, default: Date.now },
    fields: [String]
  }]
});

module.exports = mongoose.model('Tag', TagSchema);
