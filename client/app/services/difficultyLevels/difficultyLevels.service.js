'use strict';

angular.module('gamoraApp')
  .factory('difficultyLevels', function () {
    return [
      undefined,
      'Really Easy',
      'Easy',
      'Challenging',
      'Hard',
      'Nightmarish'
    ];
  });
