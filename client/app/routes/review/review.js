'use strict';

angular.module('gamoraApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('review', {
        url: '/review',
        templateUrl: 'app/routes/review/review.html',
        controller: 'ReviewCtrl'
      });
  });