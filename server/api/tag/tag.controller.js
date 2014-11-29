'use strict';

var _ = require('lodash');
var Tag = require('./tag.model');
var filterable = require('./tag.filterable');
var filterHelper = require('../../components/filterHelper');
var apiResponse = require('../../components/apiResponse');
var querystring = require('querystring');
var endpoint = '/api/tags';
var apiLinks = require('../../components/apiLinks');
var links = apiLinks.tag;

// Get list of tags
exports.index = function(req, res) {
  var paging = filterHelper.paging(req.query),
    query = filterHelper.mongoQuery(req.query, filterable),
    path = req.originalUrl.split(/\?/)[0];

  Tag.find(query).skip(paging.skip).limit(paging.limit).exec(function (err, tags) {
    if(err) { return handleError(res, err); }

    Tag.count(query, function(err, count) {
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

      return res.json(200, apiResponse.collection(tags, links, meta));
    });
  });
};

// Get a single tag
exports.show = function(req, res) {
  Tag.findById(req.params.id, function (err, tag) {
    if(err) { return handleError(res, err); }
    if(!tag) { return res.send(404); }
    return res.json(apiResponse.single(tag, links(tag)));
  });
};

// Creates a new tag in the DB.
exports.create = function(req, res) {
  var body = _.clone(req.body);

  if (typeof body.updated !== 'undefined') {
    delete body.updated;
  }

  body.updated = [{
    by: req.user._id
  }];

  if (typeof body.description === 'string') {
    body.description = [{
      text: body.description,
      author: req.user._id
    }];
  } else {
    delete body.description;
  }

  Tag.create(body, function(err, tag) {
    console.log(err);
    if(err) { return handleError(res, err); }
    return res.json(201, apiResponse.single(tag, links(tag)));
  });
};

// Updates an existing tag in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Tag.findById(req.params.id, function (err, tag) {
    if (err) { return handleError(res, err); }
    if(!tag) { return res.send(404); }

    var body = _.clone(req.body);

    if (typeof body.updated !== 'undefined') {
      delete body.updated;
    }

    tag.updated.push({
      by: req.user._id
    });

    if (typeof body.description === 'string') {
      tag.description.push({
        text: body.description,
        by: req.user._id
      });
    }

    delete body.description;

    var updated = _.merge(tag, body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, apiResponse.single(tag, links(tag)));
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
