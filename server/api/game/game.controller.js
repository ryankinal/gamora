'use strict';

var _ = require('lodash');
var Game = require('./game.model');
var Tag = require('../tag/tag.model');
var filterable = require('./game.filterable');
var filterHelper = require('../../components/filterHelper');
var apiResponse = require('../../components/apiResponse');
var endpoint = '/api/games';
var querystring = require('querystring');

var links = function(game) {
  var self = endpoint + '/' + game._id,
    tags = self + '/tags';

  return {
    self: self,
    tags: tags
  };
}

// Get list of games
exports.index = function(req, res) {
  var query = filterHelper.mongoQuery(req.query, filterable),
    paging = filterHelper.paging(req.query),
    path = req.originalUrl.split(/\?/)[0];

  if (query && query.title) {
    query.$or = [{title: query.title}, {aliases: query.title}];
    delete query.title;
  }

  Game.find(query).skip(paging.skip).limit(paging.limit).exec(function (err, games) {
    if(err) { return handleError(res, err); }

    Game.count(query, function(err, count) {
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

      return res.json(200, apiResponse.collection(games, links, meta));
    });
  });
};

// Get a single game
exports.show = function(req, res) {
  Game.findById(req.params.id, function (err, game) {
    if(err) { return handleError(res, err); }
    if(!game) { return res.send(404); }
    return res.json(apiResponse.single(game, links(game)));
  });
};

exports.tags = function(req, res) {
  Game.findById(req.params.id, function (err, game) {
    if(err) { return handleError(res, err); }
    if (!game) { return res.send(404, { error: 'Game ' + req.params.id + ' not found'}); }

    var tagIds = game.tags.map(function(def) {
      return def.tag;
    });

    Tag.find({ _id: { $in: tagIds }}, function(err, tags) {
      if (err) { return handleError(500, err); }

      return res.json(apiResponse.collection(tags, { self: req.originalUrl }, { count: tags.length }));
    });
  });
}

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
    return res.json(201, apiResponse.single(game, links(game)));
  });
};

// Updates an existing game in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Game.findById(req.params.id, function (err, game) {
    if (err) { return handleError(res, err); }
    if(!game) { return res.send(404); }

    var body = _.clone(req.body);

    if (typeof body.description === 'string' && body.description !== game.description[game.description.length -1].text) {
      game.description.push({
        text: body.description,
        user: req.user._id
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
      return res.json(200, apiResponse.single(game, links(game)));
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
