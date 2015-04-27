'use strict';

/**
 * @ngdoc overview
 * @name morningStudioApp
 * @description
 * # morningStudioApp
 *
 * Main module of the application.
 */
angular
  .module('morningStudioApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/recorder', {
        templateUrl: 'views/recorder.html',
        controller: 'RecorderCtrl'
      })
      .when('/studio', {
        templateUrl: 'views/studio.html',
        controller: 'StudioCtrl'
      })
      .when('/task', {
        templateUrl: 'views/task.html',
        controller: 'TaskCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
