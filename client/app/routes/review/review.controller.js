'use strict';

angular.module('gamoraApp')
  .controller('ReviewCtrl', function ($scope, $state, $stateParams, $location, $q, review, game, http, difficultyLevels) {
    var calculateTime = function() {
      var remaining = $scope.review.data.length;

      $scope.processing.days = Math.floor(remaining / (24 * 60));
      remaining -= $scope.processing.days * 24 * 60;

      $scope.processing.hours = Math.floor(remaining / 60);
      $scope.processing.minutes = remaining - $scope.processing.hours * 60;
    };

    $scope.loading = false;
    $scope.review = {
      data: {
        difficulty: 1
      }
    };

    $scope.processing = {
      days: 0,
      hours: 0,
      minutes: 0,
      completed: 0
    };

    $scope.difficultyLevels = difficultyLevels;

    if ($stateParams.id) {
      $scope.loading = true;

      review.getById($stateParams.id)
        .then(function(review) {
          $scope.review = review;
          $scope.loading = false;

          if (review.data.length) {
            calculateTime();
            console.log($scope.processing);
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
      $scope.review.data.length = ($scope.processing.days * 24 * 60) + ($scope.processing.hours * 60) + ($scope.processing.minutes);
      $scope.review.data.completed = ($scope.game.data.completable) ? $scope.processing.completed : -1;
      review.save($scope.review.data)
        .then(function(review) {
          $scope.$broadcast('review.save.succeeded', review);
        }, function(error) {
          $scope.$broadcast('review.save.failed', error);
        });
    };

    $scope.lengthString = function() {
      var parts = [];

      if ($scope.processing.days) {
        parts.push($scope.processing.days + ' days');
      }

      if ($scope.processing.hours || ($scope.processing.days && $scope.processing.minutes)) {
        parts.push($scope.processing.hours  + ' hours');
      }

      if ($scope.processing.minutes) {
        parts.push($scope.processing.minutes + ' hours');
      }

      console.log(parts);

      return parts.join(' ');
    };

    $scope.$on('review.save.succeeded', function(e, review) {
      $scope.saved = true;
      $scope.review = review;
      $state.go('review.view', {id: review.data._id});
    });

    $scope.$on('review.save.failed', function(e, error) {
      $scope.saved = false;
    });
  });
