xdescribe('SampleAssistant', function () {
  it('has a passing test with one expectation and a really really really really really REALLY REALLY REALLY long spec name', function() {
    runs(function () {
      this.expects_that(true).should_equal(true);
    });
  });

  it('has a passing test with two expectations', function() {
    runs(function () {
      this.expects_that(true).should_equal(true);
      this.expects_that(true).should_equal(true);
    });
  });

  xit('has a failing test with one expectation', function() {
    runs(function () {
      this.expects_that(false).should_equal(true);
    });
  });
});

xdescribe('Another Suite', function () {
  it('has a passing test with one expectation', function() {
    runs(function () {
      this.expects_that(true).should_equal(true);
    });
  });

  it('has a second passing test with one expectation', function() {
    runs(function () {
      this.expects_that(true).should_equal(true);
    });
  });

  it('has a second passing test with one expectation', function() {
    runs(function () {
      this.expects_that(true).should_equal(true);
    });
  });

  xit('has a failing test with one passing and two failing expectations', function() {
    runs(function () {
      this.expects_that(true).should_equal(true);
      this.expects_that(false).should_equal(true);
      this.expects_that(17).should_equal(25);
    });
  });

});