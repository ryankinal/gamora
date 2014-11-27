'use strict';

angular.module('gamoraApp')
  .factory('tag', function (rest) {
    return rest('/api/tags');
  });
