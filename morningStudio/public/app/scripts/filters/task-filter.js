'use strict';

/**
 */
angular.module('labcloud')
  .filter('taskStatusLabel', function () {
    return function (status) {
       if(status.text == '未完成'){
          return "label-warning";
       }else if(status.text == '已完成'){
          return "label-success";
       }
    };
  });