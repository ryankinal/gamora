'use strict';

angular.module('gamoraApp')
  .controller('ReviewCtrl', function ($scope, $state, $stateParams, $location, $q, review, game, http) {
    $scope.loading = false;
    $scope.review = {
      data: {}
    };
    $scope.days = 0;
    $scope.hours = 0;
    $scope.minutes = 0;
    $scope.completed = 0;

    if ($stateParams.id) {
      $scope.loading = true;

      review.getById($stateParams.id)
        .then(function(review) {
          $scope.review = review;
          $scope.loading = false;

          if (review.data.length) {
            var remaining = review.data.length;

            $scope.days = Math.floor(remaining / (24 * 60));
            remaining -= $scope.days * 24 * 60;

            $scope.hours = Math.floor(remaining / 60);
            $scope.minutes = remaining - $scope.hours * 60;
          }

          http(review.links.game, 'GET')
            .then(function(game) {
              $scope.game = game;
            }, function() {
              $state.go('games');
            });
        }, function() {
          $scope.loading = false;
        });
    } else {
      if ($location.search().game) {
        $scope.loading = true;
        game.getById($location.search().game)
          .then(function(game) {
            $scope.game = game;
            $scope.review.data.game = game.data._id;
          }, function(game) {
            $state.go('games');
          })
      } else {
        $state.go('games');
      }
    }

    $scope.save = function() {
      $scope.review.data.length = ($scope.days * 24 * 60) + ($scope.hours * 60) + ($scope.minutes);
      $scope.review.data.completed = ($scope.game.data.completable) ? -1 : $scope.completed;
      review.save($scope.review.data)
        .then(function(review) {
          $scope.$broadcast('review.save.succeeded', review);
        }, function(error) {
          $scope.$broadcast('review.save.failed', error);
        });
    };

    $scope.$on('review.save.succeeded', function(review) {
      $scope.saved = true;
    });

    $scope.$on('review.save.failed', function(error) {
      $scope.saved = false;
      $scope.error = true;
    });
  });
