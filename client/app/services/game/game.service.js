'use strict';

angular.module('gamoraApp')
  .factory('game', function (rest) {
    return rest('/api/games');
  });
