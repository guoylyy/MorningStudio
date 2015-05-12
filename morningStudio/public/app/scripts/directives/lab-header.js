'use strict';

/**
 * @ngdoc directive
 * @name morningStudioApp.directive:labHeader
 * @description
 * # labHeader
 */
angular.module('labcloud')
  .directive('labHeader', function () {
    return {
      templateUrl: '/app/templates/lab-header.html',
      restrict: 'E',
      controller: function ($scope, $rootScope, $location, generalService,loginService) {
        $rootScope.loginUser = generalService.getLoginUser();
        if(!($rootScope.loginUser)){
          loginService.isLogin().then(function(u){
            if(u.code == 200){
              generalService.persistentUser(u.data);
            }else{
              $scope.logout();
            }
          })
        }
        $scope.logout = function(){
          loginService.logout().then(function(rc){
            generalService.clearStorage();
          });
        };
      },
      link: function postLink(scope, element, attrs) {

      }
    };
  });
