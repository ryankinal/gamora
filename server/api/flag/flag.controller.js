'use strict';

var _ = require('lodash');
var Flag = require('./flag.model');

// Get list of flags
exports.index = function(req, res) {
  Flag.find(function (err, flags) {
    if(err) { return handleError(res, err); }
    return res.json(200, flags);
  });
};

// Get a single flag
exports.show = function(req, res) {
  Flag.findById(req.params.id, function (err, flag) {
    if(err) { return handleError(res, err); }
    if(!flag) { return res.send(404); }
    return res.json(flag);
  });
};

// Creates a new flag in the DB.
exports.create = function(req, res) {
  Flag.create(req.body, function(err, flag) {
    if(err) { return handleError(res, err); }
    return res.json(201, flag);
  });
};

// Updates an existing flag in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Flag.findById(req.params.id, function (err, flag) {
    if (err) { return handleError(res, err); }
    if(!flag) { return res.send(404); }
    var updated = _.merge(flag, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, flag);
    });
  });
};

// Deletes a flag from the DB.
exports.destroy = function(req, res) {
  Flag.findById(req.params.id, function (err, flag) {
    if(err) { return handleError(res, err); }
    if(!flag) { return res.send(404); }
    flag.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}