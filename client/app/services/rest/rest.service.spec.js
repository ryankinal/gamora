'use strict';

describe('Service: rest', function () {

  // load the service's module
  beforeEach(module('gamoraApp'));

  // instantiate service
  var rest;
  beforeEach(inject(function (_rest_) {
    rest = _rest_;
  }));

  it('should do something', function () {
    expect(!!rest).toBe(true);
  });

});
