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
      $localStorage.loginUser = loginUser;
    };

    this.clearStorage = function(){
      delete $localStorage.loginUser;
      delete $rootScope.loginUser;
      $location.path('/login');
    }

    this.getLoginUser = function(){
      if($rootScope.loginUser != undefined){
        return $rootScope.loginUser;
      }else if($localStorage.loginUser != undefined){
        $rootScope.loginUser = $localStorage.loginUser;
        return $rootScope.loginUser;
      }else{
        return false;
      }
    };
  });
