'use strict';

/**
 * @ngdoc service
 * @name labcloud.informService
 * @description
 * # informService
 * Service in the labcloud.
 */
angular.module('labcloud')
  .service('informService', function (SweetAlert) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.signleConfirmInform = function(title, text, type, f){
      SweetAlert.swal({
         title: title,
         text: text,
         type: type,
         confirmButtonText: "好的"}, 
      function(){ 
         f();
      });
    };

    this.doubleConfirmInform = function(title, text, type, f){
      SweetAlert.swal({
         title: title,
         text: text,
         type: type,
         showCancelButton: true,
         cancelButtonText: "取消",
         confirmButtonText: "好的"}, 
      function(isConfirm){ 
        if(isConfirm){
         f();
        }
      });
    };

    this.deleteConfirmInform = function(f){
      this.doubleConfirmInform('是否真的删除?','删除后将不可恢复!','warning',f);
    };

  });
