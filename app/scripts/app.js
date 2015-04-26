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
      .otherwise({
        redirectTo: '/'
      });
  });
