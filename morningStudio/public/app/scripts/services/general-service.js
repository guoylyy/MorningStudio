'use strict';

/**
 * @ngdoc service
 * @name morningStudioApp.generalService
 * @description
 * # generalService
 * Service in the morningStudioApp.
 */
angular.module('labcloud')
  .service('generalService', function ($rootScope, $location, $sessionStorage, $localStorage) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.persistentUser = function(loginUser){
      $rootScope.loginUser = loginUser;
      $sessionStorage.loginUser = loginUser;
    };

    this.clearStorage = function(){
      delete $sessionStorage.loginUser;
      delete $rootScope.loginUser;
      $location.path('/');
    }

    this.getLoginUser = function(){
      if($rootScope.loginUser != undefined){
        return $rootScope.loginUser;
      }else if($sessionStorage.loginUser != undefined){
        $rootScope.loginUser = $sessionStorage.loginUser;
        return $rootScope.loginUser;
      }else{
        return false;
      }
    };
  });
