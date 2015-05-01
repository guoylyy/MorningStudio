'use strict';

/**
 * @ngdoc service
 * @name labcloud.loginService
 * @description
 * # loginService
 * Service in the labcloud.
 */
angular.module('labcloud')
  .factory('loginService', function ($http, ApiUrl) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var userUrl = '/account';

    return {
      login : function(user){
        return $http.post(ApiUrl + userUrl + "/login", JSON.stringify(user));
      },
      logout: function(){
        return $http.get(ApiUrl + userUrl + "/logout");
      }
    };
  });
