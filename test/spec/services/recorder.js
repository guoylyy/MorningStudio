'use strict';

describe('Service: recorder', function () {

  // load the service's module
  beforeEach(module('morningStudioApp'));

  // instantiate service
  var recorder;
  beforeEach(inject(function (_recorder_) {
    recorder = _recorder_;
  }));

  it('should do something', function () {
    expect(!!recorder).toBe(true);
  });

});
