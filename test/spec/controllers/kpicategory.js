'use strict';

describe('Controller: KpicategoryCtrl', function () {

  // load the controller's module
  beforeEach(module('iocUiApp'));

  var KpicategoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    KpicategoryCtrl = $controller('KpicategoryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
