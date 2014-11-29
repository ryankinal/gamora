'use strict';

describe('Service: difficultyLevels', function () {

  // load the service's module
  beforeEach(module('gamoraApp'));

  // instantiate service
  var difficultyLevels;
  beforeEach(inject(function (_difficultyLevels_) {
    difficultyLevels = _difficultyLevels_;
  }));

  it('should do something', function () {
    expect(!!difficultyLevels).toBe(true);
  });

});
