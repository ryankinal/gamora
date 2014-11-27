'use strict';

angular.module('gamoraApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('game', {
        url: '/game',
        template: '<div ui-view></div>',
        controller: 'GameCtrl'
      })

    $stateProvider
      .state('game.view', {
        url: '/{id}',
        templateUrl: 'app/routes/game/game.html',
        controller: 'GameCtrl',
        params: {
          id: ''
        }
      });

    $stateProvider
      .state('game.add', {
        url: '/add',
        templateUrl: 'app/routes/game/edit.html',
        controller: 'GameCtrl'
      });

    $stateProvider
      .state('game.edit', {
        url: '/{id}/edit',
        templateUrl: 'app/routes/game/edit.html',
        controller: 'GameCtrl',
        params: {
          id: ''
        }
      });
  });
