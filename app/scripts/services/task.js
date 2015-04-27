'use strict';

/**
 * @ngdoc service
 * @name morningStudioApp.task
 * @description
 * # task
 * Factory in the morningStudioApp.
 */
angular.module('morningStudioApp')
  .factory('task', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
