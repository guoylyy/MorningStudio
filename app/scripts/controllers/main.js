'use strict';

/**
 * @ngdoc function
 * @name iocUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the iocUiApp
 */
angular.module('iocUiApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
