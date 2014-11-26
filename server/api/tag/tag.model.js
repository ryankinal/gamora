'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

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
    on: Number, // UTC time
    fields: [String]
  }]
});

module.exports = mongoose.model('Tag', TagSchema);
