'use strict';

/**
 * @ngdoc directive
 * @name morningStudioApp.directive:header
 * @description
 * # header
 */
angular.module('morningStudioApp')
  .directive('header', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the header directive');
      }
    };
  });
