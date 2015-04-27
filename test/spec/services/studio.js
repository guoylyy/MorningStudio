'use strict';

describe('Service: studio', function () {

  // load the service's module
  beforeEach(module('morningStudioApp'));

  // instantiate service
  var studio;
  beforeEach(inject(function (_studio_) {
    studio = _studio_;
  }));

  it('should do something', function () {
    expect(!!studio).toBe(true);
  });

});
