'use strict';

var _ = require('lodash');

module.exports = {
  paging: function(query) {
    var page = (query.page) ? parseInt(query.page) : 1,
      count = (query.count) ? parseInt(query.count) : 30;

    return {
      page: page,
      count: count,
      skip: (page - 1) * count,
      limit: count,
      previous: (page > 1) ? page - 1 : false,
      next: page + 1,
      max: page * count
    };
  },
  mongoQuery: function(query, filterable) {
    var filters = {},
      cloned = _.clone(query);

    _.forEach(filterable, function(type, field) {
      if (cloned[field]) {
        switch (type) {
          case 'date':
          case 'number':
            if (cloned[field].indexOf('|') > -1) {
              var dateParts = _.map(cloned[field].split('|'), parseFloat);
              filters[field] = {
                $gte: dateParts[0],
                $lte: dateParts[1]
              };
              break;
            } else {
              filters[field] = parseFloat(cloned[field]);
            }
            break;
          case 'string':
            if (cloned[field].charAt(0) === '*') {
              filters[field] = new RegExp(cloned[field].substring(1).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'i');
            } else if (cloned[field].charAt(0) === '^') {
              filters[field] = new RegExp('^' + cloned[field].substring(1).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), 'i')
            } else {
              filters[field] = query[field];
            }
            break;
          default:
            filters[field] = query[field];
        }
      }
    });

    if (Object.keys(filters).length) {
      return filters;
    } else {
      return undefined;
    }
  }
}
