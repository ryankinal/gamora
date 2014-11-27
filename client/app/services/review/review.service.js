'use strict';

angular.module('gamoraApp')
  .factory('review', function (rest) {
    return rest('/api/reviews');
  });
