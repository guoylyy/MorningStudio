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
    this.signleComfirmInform = function(text, f){
      SweetAlert.swal({
         title: "Are you sure?",
         text: "Your will not be able to recover this imaginary file!",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",
         confirmButtonText: "Yes, delete it!",
         closeOnConfirm: false}, 
      function(){ 
         f();
      });
    };
  });
