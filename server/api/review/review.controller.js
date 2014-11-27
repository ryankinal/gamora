'use strict';

var _ = require('lodash');
var Review = require('./review.model');
var Game = require('../game/game.model');
var filterable = require('./review.filterable');
var filterHelper = require('../../components/filterHelper');
var apiResponse = require('../../components/apiResponse');
var querystring = require('querystring');
var endpoint = '/api/reviews';

var links = function(review) {
  var self = endpoint + '/' + review._id,
    author = self + '/author',
    game = self + '/game';

  return {
    self: self,
    author: author,
    game: game
  };
}

// Get list of reviews
exports.index = function(req, res) {
  var paging = filterHelper.paging(req.query),
    query = filterHelper.mongoQuery(req.query, filterable),
    path = req.originalUrl.split(/\?/)[0];

  Review.find(query).skip(paging.skip).limit(paging.limit).exec(function (err, reviews) {
    if(err) { return handleError(res, err); }

    Review.count(query, function(err, count) {
      var meta = {},
        links = {
          self: req.originalUrl
        },
        nextQuery,
        prevQuery;

      if (!err) {
        meta.count = count;

        if (count > paging.max) {
          nextQuery = _.clone(req.query);
          nextQuery.page = paging.next;
          links.next = path + '?' + querystring.stringify(nextQuery);
        }

        if (paging.previous) {
          prevQuery = _.clone(req.query);
          prevQuery.page = paging.previous;
          links.previous = path + '?' + querystring.stringify(prevQuery);
        }
      }

      return res.json(200, apiResponse.collection(reviews, links, meta));
    });
  });
};

// Get a single review
exports.show = function(req, res) {
  Review.findById(req.params.id, function (err, review) {
    if(err) { return handleError(res, err); }
    if(!review) { return res.send(404); }
    return res.json(apiResponse.single(review, links(review)));
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
      return res.json(201, apiResponse.single(review, links(review)));
    });
  });
};

// Updates an existing review in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Review.findById(req.params.id, function (err, review) {
    if (err) { return handleError(res, err); }
    if(!review) { return res.send(404); }

    var hasPermission = review.author.equals(req.user._id) || req.user.role === 'moderator' || req.user.rol === 'admin';

    if (hasPermission) {
      var body = _.clone(req.body);

      if (typeof body.updated !== 'undefined') {
        delete body.updated;
      }

      if (typeof body.game !== 'undefined') {
        delete body.game;
      }

      review.updated.push({
        by: req.user._id
      });

      var updated = _.merge(review, body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.json(200, apiResponse.single(review, links(review)));
      });
    } else {
      return res.send(401);
    }
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
