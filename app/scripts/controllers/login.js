'use strict';

/**
 * @ngdoc function
 * @name morningStudioApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the morningStudioApp
 */
angular.module('morningStudioApp')
  .controller('LoginCtrl', ['$scope', 'SweetAlert',function ($scope, SweetAlert) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.login = function(){
      SweetAlert.swal('FSADFSA');
    };
    
  }]);
