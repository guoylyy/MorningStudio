'use strict';

/**
 * @ngdoc function
 * @name labcloud.controller:LabManageCtrl
 * @description
 * # LabManageCtrl
 * Controller of the labcloud
 */
angular.module('labcloud')
  .controller('StudioManageCtrl', ['$scope', 'dialogs', 'studios', 'recorders', 'studioService', 
    'informService', 'recorderService',
    function($scope, dialogs, studios, recorders, studioService, informService, recorderService) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
      $scope.studios = studios;
      $scope.recorders = recorders;

      function loadStudios() {
        studioService.listAll().then(function(rs) {
          $scope.studios = rs;
        });
      };
      function loadRecords(){
        recorderService.listAll().then(function(rs){
          $scope.recorders = rs;
        });
      };

      function objForm(templateUrl, data, f){
        if (data == undefined) {
          data = {};
        };
        var dialog = dialogs.create(templateUrl, 'CreateStudioCtrl', data, {
          size: 'md',
          keyboard: true,
          backdrop: true,
          windowClass: 'model-overlay'
        });
        dialog.result.then(function(data) {
            if (data.objectId != undefined) {
              f(data,'update');
            } else {
              f(data,'add');
            }
          },
          function() {
            console.log('canceled!');
          });
      }


      $scope.deleteStudio = function(id) {
        informService.deleteConfirmInform(function() {
          studioService.delete(id).then(function(rc) {
            informService.signleConfirmInform('删除成功', '', 'success', function() {
              loadStudios();
            });
          });
        });
      };

      $scope.studioForm = function(data) {
        objForm('/app/templates/studio-creation-dialog.html', data, function(data, type){
          if(type=='update'){
            studioService.put(data.objectId, data).then(function(rc) {
                informService.signleConfirmInform('更新成功!', '', 'success', function() {
                  loadStudios();
                });
              });
          }else if(type == 'add'){
            studioService.add(data).then(function(rc) {
                informService.signleConfirmInform('添加成功!', '', 'success', function() {
                  loadStudios();
                });
              });
          }
        });
      };

      $scope.deleteRecorder = function(id){
        informService.deleteConfirmInform(function() {
          recorderService.delete(id).then(function(rc) {
            informService.signleConfirmInform('删除成功', '', 'success', function() {
              loadRecords();
            });
          });
        });
      };

      $scope.recorderForm = function(data) {
        
        objForm('/app/templates/recorder-creation-dialog.html', data, function(data, type){
          if(type=='update'){
            recorderService.put(data.objectId, data).then(function(rc) {
                informService.signleConfirmInform('更新成功!', '', 'success', function() {
                  loadRecords();
                });
              });
          }else if(type == 'add'){
            recorderService.add(data).then(function(rc) {
                informService.signleConfirmInform('添加成功!', '', 'success', function() {
                  loadRecords();
                });
              });
          }
        });
      };

     

    }
  ]).controller('CreateStudioCtrl', function($scope, $modalInstance, data) {
    $scope.data = data;
    $scope.cancel = function() {
      $modalInstance.dismiss('canceled');
    };
    $scope.save = function() {
      console.log($scope.data);
      $modalInstance.close($scope.data);
    };
  });