'use strict';

/**
 * @ngdoc directive
 * @name iocUiApp.directive:iocHeader
 * @description
 * # iocHeader
 */
angular.module('iocUiApp')
  .directive('iocHeader', function () {
    return {
      templateUrl: 'template/ioc-header.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        $(".navbar-nav li").click(function(){
          $(".title_nav_brush").slideToggle("slow");
		  });
      }
    };
  });
