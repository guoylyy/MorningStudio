'use strict';

/**
 * @ngdoc function
 * @name morningStudioApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the morningStudioApp
 */
angular.module('labcloud')
  .controller('LoginController', ['$scope', 'SweetAlert','informService',function ($scope, SweetAlert, informService) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.login = function(){
      //测试提示接口
      informService.signleComfirmInform('tesfa',function(){
        console.log('test');
      });
    };
    
  }]);
