'use strict'

var app = angular.module('labcloud')
  .config(['$stateProvider','$urlRouterProvider','$locationProvider',
    function($stateProvider,$urlRouterProvider,$locationProvider){

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $urlRouterProvider
          .otherwise('/login');
    $stateProvider
        .state('login', {
          url: "/login",
          templateUrl: "/app/views/login.html",
          controller: 'LoginController',
          resolve: {
            deps: ['$ocLazyLoad',
              function($ocLazyLoad){
                return $ocLazyLoad.load('oitozero.ngSweetAlert');
            }]
          }
        }).state('task', {
          url: "/task/list",
          templateUrl: "/app/views/main.html",
          resolve: {
            taskStatus: function(dictService){
              return dictService.taskStatus();
            },
            businessTypes: function(dictService){
              return dictService.businessTypes();
            },
            studios: function(studioService){
              return studioService.listAll();
            },
            recorders: function(recorderService){
              return recorderService.listAll();
            },
            tasks: function(taskService){
              return taskService.listByPage(1);
            }
          },
          controller: 'MainController'
        }).state('studio', {
          url: "/studio/manage",
          templateUrl: "/app/views/studio-manage.html",
          resolve: {
            studios: function(studioService){
              return studioService.listAll();
            },
            recorders: function(recorderService){
              return recorderService.listAll();
            }
          },
          controller: 'StudioManageCtrl'
        })

        ;
  }]);




