'use strict';

var _ = require('lodash');
var Tag = require('./tag.model');
var filterHelper = require('../../components/filterHelper');

// Get list of tags
exports.index = function(req, res) {
  var paging = filterHelper.paging(req.query),
    filters = filterHelper.mongoQuery(req.query);

  Tag.find(filters).skip(paging.skip).limit(paging.limit).exec(function (err, tags) {
    if(err) { return handleError(res, err); }
    return res.json(200, tags);
  });
};

// Get a single tag
exports.show = function(req, res) {
  Tag.findById(req.params.id, function (err, tag) {
    if(err) { return handleError(res, err); }
    if(!tag) { return res.send(404); }
    return res.json(tag);
  });
};

// Creates a new tag in the DB.
exports.create = function(req, res) {
  var body = _.clone(req.body);

  if (typeof body.canonical !== 'undefined') {
    delete body.canonical;
  }

  if (typeof body.updated !== 'undefined') {
    delete body.updated;
  }

  body.updated = [{
    by: req.user._id,
    fields: ['all']
  }];

  if (typeof body.description === 'string') {
    body.description = [{
      text: body.description,
      author: req.user._id
    }];
  }

  Tag.create(req.body, function(err, tag) {
    if(err) { return handleError(res, err); }
    return res.json(201, tag);
  });
};

// Updates an existing tag in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Tag.findById(req.params.id, function (err, tag) {
    if (err) { return handleError(res, err); }
    if(!tag) { return res.send(404); }
    var updated = _.merge(tag, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, tag);
    });
  });
};

// Deletes a tag from the DB.
exports.destroy = function(req, res) {
  Tag.findById(req.params.id, function (err, tag) {
    if(err) { return handleError(res, err); }
    if(!tag) { return res.send(404); }
    tag.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
