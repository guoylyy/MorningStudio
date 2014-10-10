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
          $(".title_nav_brush").css("display","none");
          var n = $(this).attr("id")+"_dropdown";
          $("#"+n).slideToggle("slow");
		    });

        $(".close_btn").click(function(){
          var n = $(this).attr("value")+"_dropdown";
          $("#"+n).slideToggle("slow");
        })

      }
    };
  });
