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
      templateUrl: 'templates/lab-header.html',
      restrict: 'E',
      controller: function ($scope, $rootScope, $location) {
        
      },
      link: function postLink(scope, element, attrs) {

      }
    };
  });
