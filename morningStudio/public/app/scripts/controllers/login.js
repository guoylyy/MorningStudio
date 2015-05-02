'use strict';

/**
 * @ngdoc function
 * @name morningStudioApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the morningStudioApp
 */
angular.module('labcloud')
  .controller('LoginController', ['$scope', 'SweetAlert','informService', 'loginService', 'generalService', '$location',
    function ($scope, SweetAlert, informService, loginService, generalService, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.user = {
      username: '',
      password: ''
    };
    $scope.login = function(){
      //测试提示接口
      loginService.login($scope.user).then(function(u){
        if(u.status == 200){
          generalService.persistentUser(u.data);
           window.location.href = '/task/list';
        }else{
          alert('登录失败，服务器开了小差!');
        }
       
      });
    };
    
  }]);
