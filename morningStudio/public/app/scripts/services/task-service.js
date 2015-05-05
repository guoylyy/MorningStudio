'use strict';

/**
 * @ngdoc service
 * @name labcloud.loginService
 * @description
 * # loginService
 * Service in the labcloud.
 */
angular.module('labcloud')
  .factory('taskService', function ($http, ApiUrl, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var baseUrl = ApiUrl + '/task';

    return {
      add : function(data){
        return $http.post(baseUrl, JSON.stringify(data));
      },
      delete: function(id){
        return $http.delete(baseUrl + "/"+ id);
      },
      put: function(id, data){
        return $http.put(baseUrl + '/' + id, JSON.stringify(data));
      },
      listByPage: function(pn, status){
        var deferred = $q.defer();
        $http.get(baseUrl + '/list/'+pn, {params:{status:status}}).then(function(res){
          deferred.resolve(res.data.data);
        },function(res){
          deferred.reject(res);
        });
        return deferred.promise;
      },
      statictics: function(type,sway){
        var deferred = $q.defer();
        $http.get(baseUrl + '/statictics',{params:{type:type,sway:sway}}).then(function(res){
          var data = res.data.data.values;
          var keys = Object.keys(data);
          var flist = [];
          for (var i = 0; i < keys.length; i++) {
            flist.push([keys[i], data[keys[i]]]);
          };
          deferred.resolve({dateConfig:res.data.data.dateConfig, values:flist});

        },function(res){
          deferred.reject(res);
        });
        return deferred.promise;
      }
    };
  });
