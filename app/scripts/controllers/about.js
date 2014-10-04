'use strict';

/**
 * @ngdoc function
 * @name iocUiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the iocUiApp
 */
angular.module('iocUiApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
