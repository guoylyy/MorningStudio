'use strict';

/**
 * @ngdoc service
 * @name morningStudioApp.studio
 * @description
 * # studio
 * Factory in the morningStudioApp.
 */
angular.module('morningStudioApp')
  .factory('studio', function () {
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
