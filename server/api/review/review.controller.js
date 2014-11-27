'use strict';

var _ = require('lodash');
var Review = require('./review.model');
var Game = require('../game/game.model');
var filterable = require('./review.filterable');
var filterHelper = require('../../components/filterHelper');

// Get list of reviews
exports.index = function(req, res) {
  var paging = filterHelper.paging(req.query),
    filters = filterHelper.mongoQuery(req.query, filterable);

  Review.find(filters).skip(paging.skip).limit(paging.limit).exec(function (err, reviews) {
    if(err) { return handleError(res, err); }
    return res.json(200, reviews);
  });
};

// Get a single review
exports.show = function(req, res) {
  Review.findById(req.params.id, function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    return res.json(review);
  });
};

// Creates a new review in the DB.
exports.create = function(req, res) {
  var body = _.clone(req.body);

  if (!body.game) {
    return res.send(400, { error: 'Review has no game set'});
  }

  Game.findById(body.game, function(err, game) {
    if (err) { return handleError(res, err); }
    if (!game) { return res.send(404, {error: 'Game ' + body.game + ' not found'}); }

    if (typeof body.updated !== 'undefined') {
      delete body.updated;
    }

    body.author = req.user._id;

    body.updated = [{
      by: req.user._id
    }];

    Review.create(body, function(err, review) {
      if(err) { return handleError(res, err); }
      return res.json(201, review);
    });
  });
};

// Updates an existing review in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Review.findById(req.params.id, function (err, review) {
    if (err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    var updated = _.merge(review, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, review);
    });
  });
};

// Deletes a review from the DB.
exports.destroy = function(req, res) {
  Review.findById(req.params.id, function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    review.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
