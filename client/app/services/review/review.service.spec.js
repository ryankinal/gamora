'use strict';

describe('Service: review', function () {

  // load the service's module
  beforeEach(module('gamoraApp'));

  // instantiate service
  var review;
  beforeEach(inject(function (_review_) {
    review = _review_;
  }));

  it('should do something', function () {
    expect(!!review).toBe(true);
  });

});
