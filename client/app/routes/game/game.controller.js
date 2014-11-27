'use strict';

angular.module('gamoraApp')
  .controller('GameCtrl', function ($scope, $stateParams, game) {
    console.log($stateParams.id);

    if ($stateParams.id) {
      $scope.loading = true;
      game
        .getById($stateParams.id)
        .then(function(response) {
          $scope.game = response;
          console.log(response);
          $scope.loading = false;
        }, function(error) {
          $scope.loading = false;
          console.log(error);
        });
    }

    $scope.$on('game.save.succeeded', function(response) {
      $scope.gameId = response.data._id;
      $scope.game = response;
    });

    $scope.$on('game.save.failed', function(response) {
      $scope.error = true;
    });
  });
