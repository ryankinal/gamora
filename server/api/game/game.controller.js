'use strict';

var _ = require('lodash');
var Game = require('./game.model');
var filterable = require('./game.filterable');
var filterHelper = require('../../components/filterHelper');

// Get list of games
exports.index = function(req, res) {
  var query = filterHelper.mongoQuery(req.query, filterable),
    paging = filterHelper.paging(req.query);

  Game.find(query).skip(paging.skip).limit(paging.limit).exec(function (err, games) {
    if(err) { return handleError(res, err); }
    return res.json(200, games);
  });
};

// Get a single game
exports.show = function(req, res) {
  Game.findById(req.params.id, function (err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    return res.json(game);
  });
};

// Creates a new game in the DB.
exports.create = function(req, res) {
  var body = _.clone(req.body);

  if (typeof body.description === 'string') {
    body.description = [{
      text: req.body.description,
      user: req.user._id
    }];
  }

  if (typeof body.rating !== 'undefined') {
    delete body.rating;
  }

  if (typeof body.difficulty !== 'undefined') {
    delete body.difficulty;
  }

  body.updated = [{
    by: req.user._id
  }];

  body.active = true;

  Game.create(body, function(err, game) {
    if(err) { return handleError(res, err); }
    return res.json(201, game);
  });
};

// Updates an existing game in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Game.findById(req.params.id, function (err, game) {
    if (err) { return handleError(res, err); }
    if(!game) { return res.send(404); }

    var body = _.clone(req.body);

    if (typeof body.description === 'string') {
      game.description.push({
        text: body.description,
        by: req.user._id
      });
    }

    delete body.description;

    if (typeof body.updates !== 'undefined') {
      delete body.updates;
    }

    game.updated.push({
      by: req.user._id
    });

    var updated = _.merge(game, body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, game);
    });
  });
};

// Deletes a game from the DB.
exports.destroy = function(req, res) {
  Game.findById(req.params.id, function (err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    game.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
