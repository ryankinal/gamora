'use strict';

angular.module('gamoraApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('games', {
        url: '/games',
        templateUrl: 'app/routes/game/list.html',
        controller: 'GamesCtrl',
        params: {
          page: ''
        }
      });

    $stateProvider
      .state('games.page', {
        url: '/{page}',
        controller: 'GamesCtrl',
        templateUrl: 'app/routes/game/list.html',
        params: {
          page: ''
        }
      });

    $stateProvider
      .state('game', {
        url: '/game',
        template: '<div ui-view></div>',
        controller: 'GameCtrl'
      })

    $stateProvider
      .state('game.add', {
        url: '/add',
        templateUrl: 'app/routes/game/edit.html',
        controller: 'GameCtrl',
        authenticate: true
      });

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
      .state('game.edit', {
        url: '/{id}/edit',
        templateUrl: 'app/routes/game/edit.html',
        controller: 'GameCtrl',
        authenticate: true,
        params: {
          id: ''
        }
      });
  });
