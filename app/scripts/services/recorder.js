'use strict';

/**
 * @ngdoc service
 * @name morningStudioApp.recorder
 * @description
 * # recorder
 * Factory in the morningStudioApp.
 */
angular.module('morningStudioApp')
  .factory('Recorder', function () {
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
