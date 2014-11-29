'use strict';

angular.module('gamoraApp')
  .factory('difficultyLevels', function () {
    return {
      1: 'Really Easy',
      2: 'Easy',
      3: 'Challenging',
      4: 'Hard',
      5: 'Nightmarish'
    };
  });
