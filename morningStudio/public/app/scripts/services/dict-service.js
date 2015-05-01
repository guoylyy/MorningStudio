'use strict';

/**
 * @ngdoc service
 * @name morningStudioApp.generalService
 * @description
 * # generalService
 * Service in the morningStudioApp.
 */
angular.module('labcloud')
  .service('dictService', function ($http, ApiUrl, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var baseUrl = ApiUrl + '/dict';

    function getDicts(key){
      var deferred = $q.defer();
        $http.get(baseUrl + '/' + key).then(function(res){
          deferred.resolve(res.data.data);
        },function(res){
          deferred.reject(res);
        });
      return deferred.promise;
    }

    return {
      taskStatus: function(){
        return getDicts('taskStatus');
      },
      businessTypes: function(){
        return getDicts('businessTypes');
      }
    };
  });
