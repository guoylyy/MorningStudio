'use strict';

/**
 * @ngdoc function
 * @name morningStudioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the morningStudioApp
 */
angular.module('labcloud')
  .controller('MainController',
    function ($scope, dialogs, taskStatus, businessTypes, 
      studios, recorders, taskService, informService, tasks, $location, $anchorScroll ) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
      $scope.coefficient = 1;//乘以的系数

      $scope.swayFilters = [{name:'录音师',value:'recorder'},{name:'录音棚',value:'studio'}
                        ,{name:'消费类型',value:'businessType'}];
      $scope.taskStatusFilters = [{name:'全部',value:0},{name:'已完成',value:2},{name:'未完成',value:1}];
      $scope.monthList = [1,2,3,4,5,6,7,8,9,10,11,12];
      $scope.selected = {
        sway : $scope.swayFilters[0],
        taskStatus: $scope.taskStatusFilters[0],
        year : (new Date()).getFullYear(),
        month : $scope.monthList[1]
      };
      $scope.yearList = getYearList();
      setDefaultYearMonth();

      function getYearList(){
        var year = (new Date()).getFullYear();
        var year_init = 2014;
        var list = [];
        for (var i = year_init; i <=year; i++) {
          list.push(i);
        }
        return list;
      };

      function setDefaultYearMonth(){
        var now = new Date();
        $scope.selected.year = now.getFullYear();
        $scope.selected.month = now.getMonth() + 1;
      }
      
      $scope.taskMap = tasks;

      $scope.changeTaskStatus = function(){
        loadTask();
      };

      function loadTask() {
        var pageNumber = $scope.taskMap.currentPage;
        $scope.pageSize = $scope.taskMap.pageSize;
        taskService.listByPage(pageNumber,$scope.selected.taskStatus.value).then(function(rc) {
          $scope.taskMap = rc;
        });
        $location.hash('pageHeader');
        $anchorScroll();
      };

      $scope.pageChange = function() {
        loadTask();
      };

      $scope.deleteTask = function(id) {
        informService.deleteConfirmInform(function() {
          taskService.delete(id).then(function(rc) {
            informService.signleConfirmInform('删除成功', '', 'success', function() {
              loadTask();
            });
          });
        });
      };

      $scope.taskForm = function(data) {
        var dict = {
          'taskStatus': taskStatus,
          'businessTypes': businessTypes,
          'studios': studios,
          'recorders': recorders
        };
        if (data == undefined) {
          data = {};
        }
        var dialog = dialogs.create('/app/templates/task-creation-dialog.html', 'CreateTaskCtrl', {
          dict: dict,
          data: data
        }, {
          size: 'md',
          keyboard: true,
          backdrop: true,
          windowClass: 'model-overlay'
        });
        dialog.result.then(function(data) {

          if (data.objectId == undefined) {
            taskService.add(data).then(function(rc) {
              informService.signleConfirmInform('添加成功!', '', 'success', function() {
                loadTask();
              });
            }, function(error) {
              //添加失败
            });
          } else {
            taskService.put(data.objectId, data).then(function(rc) {
              informService.signleConfirmInform('更新成功!', '', 'success', function() {
                loadTask();
              });
            }, function(error) {
              //添加失败
            });
          }
        }, function() {
          console.log('conceled');
        });
      };



      $scope.resetStatictics = function(type){
        $scope.selected.sway = $scope.swayFilters[0];
        $scope.changeStatictics(type);
      };

      $scope.changeStatictics = function(type){
        taskService.statictics(type,$scope.selected.sway.value,concrteDate()).then(function(chartData){
          $scope.chartData = chartData.values;
          var sum = 0;
          for (var i = 0; i < chartData.values.length; i++) {
            sum += chartData.values[i][1];
          };
          if(sum == 0){
            chartData.values = [];
            informService.signleConfirmInform('选择的时间段没有任何统计数据','请录入数据过后再来查看!','warning',
              function(){});
          }
          $scope.sum = sum;
          $scope.chartConfig.series[0].data = chartData.values;
          $scope.dateConfig = chartData.dateConfig;
        });
      };

      function concrteDate(){
        var dateStr = $scope.selected.year + '-';
        if($scope.selected.month < 10){
          dateStr += '0';
        }
        dateStr += $scope.selected.month + '-01';
        return dateStr;
      };

      $scope.chartConfig = {
        "options": {
          "chart": {
            "type": "pie",
            "margin": [0, 0, 0, 0]
          },
          "plotOptions": {
            "series": {
              "stacking": "normal"
            }
          }
        },
        "series": [{
          name: "收入", 
          "data": []
        }],
        "title": {
          "text": ""
        },
        "credits": {
          "enabled": false
        },
        "loading": false,
        "size": {}
      };

    }).controller('CreateTaskCtrl', function($scope, $modalInstance, data) {

    $scope.format = 'yyyy-MM-dd';
    var now = new Date();
    now.setHours(0);
    now.setMinutes(0);
    $scope.calendar = {
      date: null,
      mytime: now
    };
    $scope.data = data.data;
    $scope.dict = data.dict;

    if ($scope.data.objectId != undefined) {
      $scope.dictSelected = {
        taskStatus: $scope.data.taskStatus,
        businessType: $scope.data.businessType,
        studio: $scope.dict.studios[findObj($scope.dict.studios, $scope.data.studio.objectId)],
        recorder: $scope.dict.recorders[findObj($scope.dict.recorders, $scope.data.recorder.objectId)]
      };
      $scope.calendar.mytime.setHours($scope.data.time.hours);
      $scope.calendar.mytime.setMinutes($scope.data.time.minites);
      $scope.calendar.date = new Date($scope.data.taskDate).Format($scope.format);
    } else {
      $scope.dictSelected = {
        taskStatus: $scope.dict.taskStatus[0],
        businessType: $scope.dict.businessTypes[0],
        studio: $scope.dict.studios[0],
        recorder: $scope.dict.recorders[0]
      };
    }

    //如果是更新，就需要重设一下初始值
    function findObj(lst, objectId) {
      if (objectId == undefined && lst.length > 0)
        return 0;
      for (var i = 0; i < lst.length; i++) {
        if (lst[i].objectId == objectId) {
          return i;
        }
      };
      return 0;
    };
    $scope.hstep = 1;
    $scope.mstep = 30;
    $scope.ismeridian = false;
    $scope.calendar.isopen = false;
    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.calendar.isopen = true;
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('canceled');
    };
    $scope.save = function() {
      var ndata = JSON.parse(JSON.stringify($scope.data));
      ndata['taskStatus'] = $scope.dictSelected.taskStatus.value;
      ndata['businessType'] = $scope.dictSelected.businessType.value;
      ndata['studio'] = $scope.dictSelected.studio.objectId;
      ndata['recorder'] = $scope.dictSelected.recorder.objectId;
      ndata['taskDate'] = new Date($scope.calendar.date);
      ndata['time'] = {
        hours: $scope.calendar.mytime.getHours(),
        minites: $scope.calendar.mytime.getMinutes()
      };
      $modalInstance.close(ndata);
    };
  });;