'use strict';

angular.module('gamoraApp')
  .controller('GameCtrl', function ($scope, $state, $stateParams, game, _) {
    var updateScope = function(response) {
      var descriptions = response.data.description,
        numDescriptions = descriptions.length;

      $scope.game = response;
      $scope.descriptionHistory = descriptions;
      $scope.game.data.description = descriptions[numDescriptions - 1].text;
      $scope.description = {
        text: descriptions[numDescriptions - 1].text + ''
      };
    }

    if ($stateParams.id) {
      $scope.loading = true;
      game
        .getById($stateParams.id)
        .then(function(response) {
          updateScope(response);
          $scope.loading = false;
        }, function(error) {
          $scope.loading = false;
        });
    }

    $scope.save = function() {
      game.save($scope.game.data).then(function(response) {
        $scope.$broadcast('game.save.succeeded', response);
      }, function(error) {
        $scope.$broadcast('game.save.failed', error);
      });
    };

    $scope.$on('game.save.succeeded', function(e, response) {
      updateScope(response);
      $state.go('game.view', { id: response.data._id });
    });

    $scope.$on('game.save.failed', function(response) {
      $scope.error = true;
    });
  })

  .controller('GamesCtrl', function ($scope, $state, $stateParams, game, _, http) {
    $scope.filters = {};

    if ($stateParams.page) {
      $scope.filters.page = parseInt($stateParams.page, 10);
    } else {
      $scope.filters.page = 1;
    }

    game.get($scope.filters)
      .then(function(response) {
        $scope.games = response;
      }, function(error) {
        $scope.error = true;
      });
  });
