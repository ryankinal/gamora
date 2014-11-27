'use strict';

var _ = require('lodash');

module.exports = {
  single: function(data, links, meta) {
    var response = {
      meta: {
        collection: false
      },
      links: {}
    };

    if (meta) {
      response.meta = _.merge(response.meta, meta);
    }

    if (links) {
      response.links = links;
    }

    response.data = data;

    return response;
  },
  collection: function(data, links, meta) {
    var response = {
      meta: {
        collection: true
      },
      links: {}
    };

    if (meta) {
      response.meta = _.merge(response.meta, meta);
    }

    if (links) {
      response.links = links;
    }

    response.data = data;

    return response;
  },
  blank: function(meta) {
    var response = {
      meta: {
        empty: true
      }
    }
  }
}
