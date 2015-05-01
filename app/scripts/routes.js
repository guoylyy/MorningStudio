'use strict'

var app = angular.module('labcloud')
  .config(['$stateProvider','$urlRouterProvider','$locationProvider',
    function($stateProvider,$urlRouterProvider,$locationProvider){

    $locationProvider.html5Mode({
      enabled: false,
      requireBase: false
    });
    $urlRouterProvider
          .otherwise('/login');
    $stateProvider
        .state('login', {
          url: "/login",
          templateUrl: "views/login.html",
          controller: 'LoginController',
          resolve: {
            deps: ['$ocLazyLoad',
              function($ocLazyLoad){
                return $ocLazyLoad.load('oitozero.ngSweetAlert');
            }]
          }
        });
  }]);




