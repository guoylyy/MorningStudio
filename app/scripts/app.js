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
  .module('labcloud', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.sortable',
    'ui.bootstrap',
    'ui.date',
    'ui.tinymce',
    'ui.select2',


    //for test
    'oitozero.ngSweetAlert',
    // 'angularFileUpload',
    'dialogs.main',
    'ui.bootstrap.datepicker',
    "oc.lazyLoad"
  ]);
  // .config(function ($routeProvider) {
  //   $routeProvider
  //     .when('/', {
  //       templateUrl: 'views/login.html',
  //       controller: 'LoginController'
  //     })
  //     .when('/user-manage', {
  //       templateUrl: 'views/user-manage.html',
  //       controller: 'UserManageCtrl'
  //     })
  //     .when('/lab-manage', {
  //       templateUrl: 'views/lab-manage.html',
  //       controller: 'LabManageCtrl'
  //     })
  //     .when('/apply-manage', {
  //       templateUrl: 'views/apply-manage.html',
  //       controller: 'ApplyManageCtrl'
  //     })
  //     .when('/semester', {
  //       templateUrl: 'views/semester.html',
  //       controller: 'SemesterManageCtrl'
  //     })
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  // });
