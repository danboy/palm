// Bootstrap Test Reporter function
var reporter = function () {
  var total = 0;
  var passes = 0;
  var fails = 0;
  var start = new Date();

  var createElement = function(tag, attrs) {
    element = document.createElement(tag);
    for (attr in attrs){
      element[attr] = attrs[attr];
    }
    return element;
  };

  var that = {
    toJSON: function(object){
      return JSON.stringify(object);
    },
    test: function (result, message) {
      total++;

      if (result) {
        passes++;
        iconElement = document.getElementById('icons');
        iconElement.appendChild(createElement('img', {src: '../images/go-16.png'}));
      }
      else {
        fails++;
        var fails_report = document.getElementById('fails');
        fails_report.style.display = "";

        var iconElement = document.getElementById('icons');
        iconElement.appendChild(createElement('img', {src: '../images/fail-16.png'}));

        var failMessages = document.getElementById('fail_messages');
        var newFail = createElement('p', {'class': 'fail'});
        newFail.innerHTML = message;
        failMessages.appendChild(newFail);
      }
    },

    summary: function () {
      var el = createElement('p', {'class': ((fails > 0) ? 'fail_in_summary' : '') });
      el.innerHTML = total + ' expectations, ' + passes + ' passing, ' + fails + ' failed in ' + (new Date().getTime() - start.getTime()) + "ms.";

      var summaryElement = document.getElementById('results_summary');
      summaryElement.appendChild(el);
      summaryElement.style.display = "";
    }
  }
  return that;
}();

var testMatchersComparisons = function () {
  var expected = new Jasmine.Matchers(true);
  reporter.test(expected.should_equal(true),
    'expects_that(true).should_equal(true) returned false');

  expected = new Jasmine.Matchers(false);
  reporter.test(!(expected.should_equal(true)),
    'expects_that(true).should_equal(true) returned true');

  expected = new Jasmine.Matchers(true);
  reporter.test(expected.should_not_equal(false),
    'expects_that(true).should_not_equal(false) returned false');

  expected = new Jasmine.Matchers(true);
  reporter.test(!(expected.should_not_equal(true)),
    'expects_that(true).should_not_equal(false) returned true');

  expected = new Jasmine.Matchers('foobarbel');
  reporter.test((expected.should_match(/bar/)),
    'expects_that(forbarbel).should_match(/bar/) returned false');

  expected = new Jasmine.Matchers('foobazbel');
  reporter.test(!(expected.should_match(/bar/)),
    'expects_that(forbazbel).should_match(/bar/) returned true');

  expected = new Jasmine.Matchers('foobarbel');
  reporter.test((expected.should_match("bar")),
    'expects_that(forbarbel).should_match(/bar/) returned false');

  expected = new Jasmine.Matchers('foobazbel');
  reporter.test(!(expected.should_match("bar")),
    'expects_that(forbazbel).should_match(/bar/) returned true');

  expected = new Jasmine.Matchers('foobarbel');
  reporter.test(!(expected.should_not_match(/bar/)),
    'expects_that(forbarbel).should_not_match(/bar/) returned false');

  expected = new Jasmine.Matchers('foobazbel');
  reporter.test((expected.should_not_match(/bar/)),
    'expects_that(forbazbel).should_not_match(/bar/) returned true');

  expected = new Jasmine.Matchers('foobarbel');
  reporter.test(!(expected.should_not_match("bar")),
    'expects_that(forbarbel).should_not_match("bar") returned false');

  expected = new Jasmine.Matchers('foobazbel');
  reporter.test((expected.should_not_match("bar")),
    'expects_that(forbazbel).should_not_match("bar") returned true');

  expected = new Jasmine.Matchers('foo');
  reporter.test(expected.should_be_defined(),
    'expects_that(foo).should_be_defined() returned true');

  expected = new Jasmine.Matchers(undefined);
  reporter.test(! expected.should_be_defined(),
    'expects_that(undefined).should_be_defined() returned false');

  expected = new Jasmine.Matchers(undefined);
  reporter.test(expected.should_equal(undefined),
    'expects_that(undefined).should_equal(undefined) should return true');

  expected = new Jasmine.Matchers({foo:'bar'});
  reporter.test(expected.should_equal({foo:'bar'}),
    'expects_that({foo:\'bar\').should_equal({foo:\'bar\'}) returned true');

  expected = new Jasmine.Matchers("foo");
  reporter.test(! expected.should_equal({bar: undefined}),
    'expects_that({"foo").should_equal({bar:undefined}) should return false');

  expected = new Jasmine.Matchers({foo: undefined});
  reporter.test(! expected.should_equal("goo"),
      'expects_that({foo:undefined}).should_equal("goo") should return false');

  expected = new Jasmine.Matchers({foo: {bar :undefined}});
  reporter.test(! expected.should_equal("goo"),
      'expects_that({foo:{ bar: undefined}}).should_equal("goo") should return false');


  expected = new Jasmine.Matchers({foo: "bar", baz: undefined});
  reporter.test(expected.should_equal({foo: "bar", baz: undefined}),
      'expects_that({foo: "bar", baz: undefined}).should_equal({foo: "bar", baz: undefined}) should return true');

  expected = new Jasmine.Matchers({foo:['bar','baz','quux']});
  reporter.test(expected.should_equal({foo:['bar','baz','quux']}),
    "expects_that({foo:['bar','baz','quux']}).should_equal({foo:['bar','baz','quux']}) returned true");

  expected = new Jasmine.Matchers({foo: {bar:'baz'}, quux:'corge'});
  reporter.test(expected.should_equal({foo:{bar:'baz'}, quux:'corge'}),
    'expects_that({foo:{bar:"baz"}, quux:"corge"}).should_equal({foo: {bar: \'baz\'}, quux:\'corge\'}) returned true');

  expected = new Jasmine.Matchers({x:"x", y:"y", z:"w"});
  reporter.test(expected.should_not_equal({x:"x", y:"y", z:"z"}),
    'expects_that({x:"x", y:"y", z:"w"}).should_not_equal({x:"x", y:"y", z:"w"}) returned true');

  expected = new Jasmine.Matchers({x:"x", y:"y", w:"z"});
  reporter.test(expected.should_not_equal({x:"x", y:"y", z:"z"}),
    'expects_that({x:"x", y:"y", w:"z"}).should_not_equal({x:"x", y:"y", z:"z"}) returned true');

  expected = new Jasmine.Matchers({x:"x", y:"y", z:"z"});
  reporter.test(expected.should_not_equal({w: "w", x:"x", y:"y", z:"z"}),
    'expects_that({x:"x", y:"y", z:"z"}).should_not_equal({w: "w", x:"x", y:"y", z:"z"}) returned true');

  expected = new Jasmine.Matchers({w: "w", x:"x", y:"y", z:"z"});
  reporter.test(expected.should_not_equal({x:"x", y:"y", z:"z"}),
    'expects_that({w: "w", x:"x", y:"y", z:"z"}).should_not_equal({x:"x", y:"y", z:"z"}) returned true');
}

var testMatchersPrettyPrinting = function () {
  var sampleValue;
  var expected;
  var actual;

  sampleValue = 'some string';
  reporter.test((Jasmine.pp(sampleValue) === "'some string'"),
      "Expected Jasmine.pp('some string') to return the string 'some string' but got " + Jasmine.pp(sampleValue));

  sampleValue = true;
  reporter.test((Jasmine.pp(sampleValue) === 'true'),
      "Expected Jasmine.pp(true) to return the string 'true' but got " + Jasmine.pp(sampleValue));

  sampleValue = false;
  reporter.test((Jasmine.pp(sampleValue) === 'false'),
      "Expected Jasmine.pp(false) to return the string 'false' but got " + Jasmine.pp(sampleValue));

  sampleValue = null;
  reporter.test((Jasmine.pp(sampleValue) === 'null'),
      "Expected Jasmine.pp(null) to return the string 'null' but got " + Jasmine.pp(sampleValue));

  sampleValue = undefined;
  reporter.test((Jasmine.pp(sampleValue) === 'undefined'),
      "Expected Jasmine.pp(undefined) to return the string 'undefined' but got " + Jasmine.pp(sampleValue));

  sampleValue = 3;
  reporter.test((Jasmine.pp(sampleValue) === '3'),
      "Expected Jasmine.pp(3) to return the string '3' but got " + Jasmine.pp(sampleValue));

  sampleValue = [1, 2];
  reporter.test((Jasmine.pp(sampleValue) === '[ 1, 2 ]'),
      "Expected Jasmine.pp([ 1, 2 ]) to return the string '[ 1, 2 ]' but got " + Jasmine.pp(sampleValue));

  var array1 = [1, 2];
  var array2 = [array1];
  array1.push(array2);
  sampleValue = array1;
  expected = '[ 1, 2, Array ]';
  actual = Jasmine.pp(sampleValue);
  reporter.test(actual === expected,
      "Expected Jasmine.pp([ 1, 2, Array ]) to return the string "  + '"' + expected + '"' + " but got " + actual);

  sampleValue = [1, 'foo', {}, undefined, null];
  expected = "[ 1, 'foo', Object, undefined, null ]";
  actual = Jasmine.pp(sampleValue);
  reporter.test(actual === expected,
      "Expected Jasmine.pp([ 1, 'foo', Object, undefined, null ]) to return the string "  + '"' + expected + '"' + " but got " + actual);

  sampleValue = {foo: 'bar'};
  expected = "{ foo : 'bar' }";
  actual = Jasmine.pp(sampleValue);
  reporter.test(actual === expected,
      "Expected Jasmine.pp({ foo : 'bar' }) to return the string "  + '"' + expected + '"' + " but got " + actual);

  sampleValue = {foo:'bar', baz:3, nullValue: null, undefinedValue: undefined};
  expected = "{ foo : 'bar', baz : 3, nullValue : null, undefinedValue : undefined }";
  actual = Jasmine.pp(sampleValue);
  reporter.test(actual === expected,
      "Expected Jasmine.pp(" + '"' + "{ foo : 'bar', baz : 3, nullValue : null, undefinedValue : undefined }" + '"' + " to return the string "  + '"' + expected + '"' + " but got " + actual);
  
  sampleValue = {foo: function (){}, bar: [1, 2, 3]};
  expected = "{ foo : Function, bar : Array }";
  actual = Jasmine.pp(sampleValue);
  reporter.test(actual === expected,
      "Expected Jasmine.pp(" + '"' + "{ foo : function () {}, bar : [1, 2, 3] }" + '"' + " to return the string "  + '"' + expected + '"' + " but got " + actual);

  sampleValue = {foo: 'hello'};
  sampleValue.nested = sampleValue;
  expected = "{ foo : 'hello', nested : Object }";
  actual = Jasmine.pp(sampleValue);
  reporter.test(actual === expected,
      "Expected Jasmine.pp({foo: \'hello\'}) to return the string " + '"' + expected + '"' + " but got " + actual);

  var sampleNode = document.createElement('div');
  sampleNode.innerHTML = 'foo';
  sampleValue = sampleNode;
  reporter.test((Jasmine.pp(sampleValue) === "HTMLNode"),
      "Expected Jasmine.pp(" + sampleValue +  ") to return the string " + '"' + "HTMLNode" + '"' + " but got " + Jasmine.pp(sampleValue));

  sampleValue = {foo: sampleNode}
  reporter.test((Jasmine.pp(sampleValue) === "{ foo : HTMLNode }"),
      "Expected Jasmine.pp({ foo : " + sampleNode +  " }) to return the string " + '"' + "{ foo: HTMLNode }" + '"' + " but got " + Jasmine.pp(sampleValue));

  //todo object with function
}

var testMatchersReporting = function () {

  var results = [];
  var expected = new Jasmine.Matchers(true, results);
  expected.should_equal(true);
  expected.should_equal(false);

  reporter.test((results.length == 2),
    "Results array doesn't have 2 results");

  reporter.test((results[0].passed === true),
    "First spec didn't pass");

  reporter.test((results[1].passed === false),
    "Second spec did pass");

  results = [];
  expected = new Jasmine.Matchers(false, results);
  expected.should_equal(true);

  reporter.test((results[0].message == 'Expected true but got false.'),
    "Failed expectation didn't test the failure message");

  results = [];
  expected = new Jasmine.Matchers(true, results);
  expected.should_equal(true);

  reporter.test((results[0].message == 'Passed.'),
    "Passing expectation didn't test the passing message");
}

var testDisabledSpecs = function () {
  var xitSpecWasRun = false;
  var suite = describe('default current suite', function() {

    xit('disabled spec').runs(function () {
      xitSpecWasRun = true;
    });

    it('enabled spec').runs(function () {
      var foo = 'bar';
      this.expects_that(foo).should_equal('bar');
    });

  });


  suite.execute();

  reporter.test((suite.specs.length === 1),
    "Only one spec should be defined in this suite.");

  reporter.test((xitSpecWasRun === false),
    "xitSpec should not have been run.");

}

var testDisabledSuites = function(){
  var dontChangeMe = 'dontChangeMe';
  var disabledSuite = xdescribe('a disabled suite', function(){
    it('enabled spec, but should not be run', function(){
      dontChangeMe = 'changed';
    });
  });

  disabledSuite.execute();

  reporter.test((dontChangeMe === 'dontChangeMe'),
    "spec in disabled suite should not have been run.");
};

var testSpecs = function () {
  var currentSuite = describe('default current suite', function() {
  });

  var spec = it('new spec');
  reporter.test((spec.description == 'new spec'),
    "Spec did not have a description");

  var another_spec = it('spec with an expectation').runs(function () {
    var foo = 'bar';
    this.expects_that(foo).should_equal('bar');
  });
  another_spec.execute();
  another_spec.done = true;

  reporter.test((another_spec.results.results.length === 1),
    "Results aren't there after a spec was executed");
  reporter.test((another_spec.results.results[0].passed === true),
    "Results has a result, but it's true");
  reporter.test((another_spec.results.description === 'spec with an expectation'),
    "Spec's results did not get the spec's description");

  var yet_another_spec = it('spec with failing expectation').runs(function () {
    var foo = 'bar';
    this.expects_that(foo).should_equal('baz');
  });
  yet_another_spec.execute();
  yet_another_spec.done = true;

  reporter.test((yet_another_spec.results.results[0].passed === false),
    "Expectation that failed, passed");

  var yet_yet_another_spec = it('spec with multiple assertions').runs(function () {
    var foo = 'bar';
    var baz = 'quux';

    this.expects_that(foo).should_equal('bar');
    this.expects_that(baz).should_equal('quux');
  });
  yet_yet_another_spec.execute();
  yet_yet_another_spec.done = true;

  reporter.test((yet_yet_another_spec.results.results.length === 2),
    "Spec doesn't support multiple expectations");
}

var testAsyncSpecs = function () {
  var foo = 0;

  //set a bogus suite for the spec to attach to
  jasmine.currentSuite = {specs: []};

  var a_spec = it('simple queue test', function () {
    runs(function () {
      foo++;
    });
    runs(function () {
      this.expects_that(foo).should_equal(1)
    });
  });

  reporter.test(a_spec.queue.length === 2,
    'Spec queue length is not 2');

  foo = 0;
  a_spec = it('spec w/ queued statments', function () {
    runs(function () {
      foo++;
    });
    runs(function () {
      this.expects_that(foo).should_equal(1);
    });
  });

  a_spec.execute();

  reporter.test((a_spec.results.results.length === 1),
    'No call to waits(): Spec queue did not run all functions');
  reporter.test((a_spec.results.results[0].passed === true),
    'No call to waits(): Queued expectation failed');

  foo = 0;
  a_spec = it('spec w/ queued statments', function () {
    runs(function () {
      setTimeout(function() {
        foo++
      }, 500);
    });
    waits(1000);
    runs(function() {
      this.expects_that(foo).should_equal(1);
    });
  });

  a_spec.execute();
  Clock.tick(500);
  Clock.tick(500);

  reporter.test((a_spec.results.results.length === 1),
    'Calling waits(): Spec queue did not run all functions');

  reporter.test((a_spec.results.results[0].passed === true),
    'Calling waits(): Queued expectation failed');
  
  var bar = 0;
  var another_spec = it('spec w/ queued statments', function () {
    runs(function () {
      setTimeout(function() {
        bar++;
      }, 250);

    });
    waits(500);
    runs(function () {
      setTimeout(function() {
        bar++;
      }, 250);
    });
    waits(500);
    runs(function () {
      this.expects_that(bar).should_equal(2);
    });
  });

  another_spec.execute();
  Clock.tick(1000);
  reporter.test((another_spec.queue.length === 3),
    'Calling 2 waits(): Spec queue was less than expected length');
  reporter.test((another_spec.results.results.length === 1),
    'Calling 2 waits(): Spec queue did not run all functions');
  reporter.test((another_spec.results.results[0].passed === true),
    'Calling 2 waits(): Queued expectation failed');

  var baz = 0;
  var yet_another_spec = it('spec w/ async fail', function () {
    runs(function () {
      setTimeout(function() {
        baz++;
      }, 250);
    });
    waits(100);
    runs(function() {
      this.expects_that(baz).should_equal(1);
    });
  });



  yet_another_spec.execute();
  Clock.tick(250);

  reporter.test((yet_another_spec.queue.length === 2),
    'Calling 2 waits(): Spec queue was less than expected length');
  reporter.test((yet_another_spec.results.results.length === 1),
    'Calling 2 waits(): Spec queue did not run all functions');
  reporter.test((yet_another_spec.results.results[0].passed === false),
    'Calling 2 waits(): Queued expectation failed');
}

var testAsyncSpecsWithMockSuite = function () {
  var bar = 0;
  var another_spec = it('spec w/ queued statments', function () {
    runs(function () {
      setTimeout(function() {
        bar++;
      }, 250);
    });
    waits(500);
    runs(function () {
      setTimeout(function() {
        bar++;
      }, 250);
    });
    waits(1500)
    runs(function() {
      this.expects_that(bar).should_equal(2);
    });
  });

  another_spec.execute();
  Clock.tick(2000);
  reporter.test((another_spec.queue.length === 3),
    'Calling 2 waits(): Spec queue was less than expected length');
  reporter.test((another_spec.results.results.length === 1),
    'Calling 2 waits(): Spec queue did not run all functions');
  reporter.test((another_spec.results.results[0].passed === true),
    'Calling 2 waits(): Queued expectation failed');
}

var testWaitsFor = function() {
  var doneWaiting = false;
  var runsBlockExecuted = false;

  var spec;
  describe('foo', function() {
    spec = it('has a waits for', function() {
      runs(function() {
      });

      waitsFor(500, function() {
        return doneWaiting;
      });

      runs(function() {
        runsBlockExecuted = true;
      });
   });
  });

  spec.execute();
  reporter.test(runsBlockExecuted === false, 'should not have executed runs block yet');
  Clock.tick(100);
  doneWaiting = true;
  Clock.tick(100);
  reporter.test(runsBlockExecuted === true, 'should have executed runs block');
};

var testWaitsForFailsIfTimeout = function() {
  var runsBlockExecuted = false;

  var spec;
  describe('foo', function() {
    spec = it('has a waits for', function() {
      runs(function() {
      });

      waitsFor(500, function() {
        return false; // force a timeout
      });

      runs(function() {
        runsBlockExecuted = true;
      });
   });
  });

  spec.execute();
  reporter.test(runsBlockExecuted === false, 'should not have executed runs block yet');
  Clock.tick(100);
  reporter.test(runsBlockExecuted === false, 'should not have executed runs block yet');
  Clock.tick(400);
  reporter.test(runsBlockExecuted === false, 'should have timed out, so the second runs block should not have been called');
};

var testSpecAfter = function(){
  var log = "";
  var spec;
  var suite = describe("has after", function(){
    spec = it('spec with after', function(){
      runs(function(){
        log += "spec";
      });
    });
  });
  spec.after(function(){
    log += "after1"
  });
  spec.after(function(){
    log += "after2"
  });

  suite.execute();
  reporter.test((log == "specafter1after2"), "after function should be executed after spec runs");
};

var testSuites = function () {

  // suite has a description
  var suite = describe('one suite description', function() {
  });
  reporter.test((suite.description == 'one suite description'),
    'Suite did not get a description');

  // suite can have a test
  suite = describe('one suite description', function () {
    it('should be a test');
  });

  reporter.test((suite.specs.length === 1),
    'Suite did not get a spec pushed');
  reporter.test((suite.specs[0].queue.length === 0),
    "Suite's Spec should not have queuedFunctions");

  suite = describe('one suite description', function () {
    it('should be a test with queuedFunctions', function() {
      runs(function() {
        var foo = 0;
        foo++;
      });
    });
  });

  reporter.test((suite.specs[0].queue.length === 1),
    "Suite's spec did not get a function pushed");

  suite = describe('one suite description', function () {
    it('should be a test with queuedFunctions', function() {
      runs(function() {
        var foo = 0;
        foo++;
      });
      waits(100);
      runs(function() {
        var bar = 0;
        bar++;
      });

    });
  });

  reporter.test((suite.specs[0].queue.length === 2),
    "Suite's spec did not get 2 functions pushed");

  var foo = 0;
  suite = describe('one suite description', function () {
    it('should be a test with queuedFunctions', function() {
      runs(function() {
        foo++;
      });
    });

    it('should be a another spec with queuedFunctions', function() {
      runs(function() {
        foo++;
      });
    });
  });

  suite.execute();

    reporter.test((suite.specs.length === 2),
      "Suite doesn't have two specs");
    reporter.test((foo === 2),
      "Suite didn't execute both specs");
}

var testBeforeAndAfterCallbacks = function () {

  var suiteWithBefore = describe('one suite with a before', function () {

    beforeEach(function () {
      this.foo = 1;
    });

    it('should be a spec', function () {
      runs(function() {
        this.foo++;
        this.expects_that(this.foo).should_equal(2);
      });
    });

    it('should be another spec', function () {
      runs(function() {
        this.foo++;
        this.expects_that(this.foo).should_equal(2);
      });
    });
  });

  suiteWithBefore.execute();
  var suite = suiteWithBefore;
  reporter.test((suite.beforeEach !== undefined),
    "Suite's beforeEach was not defined");
  reporter.test((suite.results.results[0].results[0].passed === true),
    "the first spec's foo should have been 2");
  reporter.test((suite.results.results[1].results[0].passed === true),
    "the second spec's this.foo should have been 2");

  var suiteWithAfter = describe('one suite with an after_each', function () {

    it('should be a spec with an after_each', function () {
      runs(function() {
        this.foo = 0;
        this.foo++;
        this.expects_that(this.foo).should_equal(1);
      });
    });

    it('should be another spec with an after_each', function () {
      runs(function() {
        this.foo = 0;
        this.foo++;
        this.expects_that(this.foo).should_equal(1);
      });
    });

    afterEach(function () {
      this.foo = 0;
    });
  });

  suiteWithAfter.execute();
  var suite = suiteWithAfter;
  reporter.test((suite.afterEach !== undefined),
    "Suite's afterEach was not defined");
  reporter.test((suite.results.results[0].results[0].passed === true),
    "afterEach failure: " + suite.results.results[0].results[0].message);
  reporter.test((suite.specs[0].foo === 0),
    "afterEach failure: foo was not reset to 0");
  reporter.test((suite.results.results[1].results[0].passed === true),
    "afterEach failure: " + suite.results.results[0].results[0].message);
  reporter.test((suite.specs[1].foo === 0),
    "afterEach failure: foo was not reset to 0");

}

var testBeforeExecutesSafely = function(){
  var report = "";
  var suite = describe('before fails on first test, passes on second', function(){
    var counter = 0;
    beforeEach(function(){
      counter++;
      if (counter == 1) {
        throw "before failure";
      }
    });
    it("first should not run because before fails", function(){
      runs(function(){
        report += "first";
        this.expects_that(true).should_equal(true);
      });
    });
    it("second should run and pass because before passes", function(){
      runs(function(){
        report += "second";
        this.expects_that(true).should_equal(true);
      });
    });
  });

  suite.execute();

  reporter.test((report === "second"), "only second test should run");
  reporter.test(suite.specs[0].results.results[0].passed === false, "1st spec should fail");
  reporter.test(suite.specs[1].results.results[0].passed === true, "2nd spec should pass");

  reporter.test(suite.specResults[0].results[0].passed === false, "1st spec should fail");
  reporter.test(suite.specResults[1].results[0].passed === true, "2nd spec should pass");
};

var testAfterExecutesSafely = function(){
  var report = "";
  var suite = describe('after fails on first test, then passes', function(){
    var counter = 0;
    afterEach(function(){
      counter++;
      if (counter == 1) {
        throw "after failure";
      }
    });
    it("first should run, expectation passes, but spec fails because after fails", function(){
      runs(function(){
        report += "first";
        this.expects_that(true).should_equal(true);
      });
    });
    it("second should run and pass because after passes", function(){
      runs(function(){
        report += "second";
        this.expects_that(true).should_equal(true);
      });
    });
    it("third should run and pass because after passes", function(){
      runs(function(){
        report += "third";
        this.expects_that(true).should_equal(true);
      });
    });
  });

  suite.execute();

  reporter.test((report === "firstsecondthird"), "all tests should run");
  reporter.test(suite.specs[0].results.results[0].passed === true, "1st specs expectation should pass");
  reporter.test(suite.specs[0].results.results[1].passed === false, "failed after should generate a failure");
  reporter.test(suite.specs[1].results.results[0].passed === true, "2nd spec should pass");
  reporter.test(suite.specs[2].results.results[0].passed === true, "3rd spec should pass");

  reporter.test(suite.specResults[0].results[0].passed === true, "1st specs expectation should pass");
  reporter.test(suite.specResults[0].results[1].passed === false, "failed after should generate a failure");
  reporter.test(suite.specResults[1].results[0].passed === true, "2nd spec should pass");
  reporter.test(suite.specResults[2].results[0].passed === true, "3rd spec should pass");

};

var testSpecScope = function () {

  var suite = describe('one suite description', function () {
    it('should be a test with queuedFunctions', function() {
      runs(function() {
        this.foo = 0;
        this.foo++;
      });

      runs(function() {
        var that = this;
        setTimeout(function() {
          that.foo++;
        }, 250);
      });

      runs(function() {
        this.expects_that(this.foo).should_equal(2);
      });

      waits(300);

      runs(function() {
        this.expects_that(this.foo).should_equal(2);
      });
    });

  });

  suite.execute();
  Clock.tick(600);
  reporter.test((suite.specs[0].foo === 2),
    "Spec does not maintain scope in between functions");
  reporter.test((suite.specs[0].results.results.length === 2),
    "Spec did not get results for all expectations");
  reporter.test((suite.specs[0].results.results[0].passed === false),
    "Spec did not return false for a failed expectation");
  reporter.test((suite.specs[0].results.results[1].passed === true),
    "Spec did not return true for a passing expectation");
  reporter.test((suite.results.description === 'one suite description'),
    "Suite did not get its description in the results");
}


var testRunner = function() {

  var runner = Runner();
  describe('one suite description', function () {
    it('should be a test');
  });
  reporter.test((runner.suites.length === 1),
    "Runner expected one suite, got " + runner.suites.length);

  runner = Runner();
  describe('one suite description', function () {
    it('should be a test');
  });
  describe('another suite description', function () {
    it('should be a test');
  });
  reporter.test((runner.suites.length === 2),
    "Runner expected two suites, but got " + runner.suites.length);

  runner = Runner();
  describe('one suite description', function () {
    it('should be a test', function() {
      runs(function () {
        this.expects_that(true).should_equal(true);
      });
    });
  });

  describe('another suite description', function () {
    it('should be another test', function() {
      runs(function () {
        this.expects_that(true).should_equal(false);
      });
    });
  });

  runner.execute();

  reporter.test((runner.suites.length === 2),
    "Runner expected two suites, got " + runner.suites.length);
  reporter.test((runner.suites[0].specs[0].results.results[0].passed === true),
    "Runner should have run specs in first suite");
  reporter.test((runner.suites[1].specs[0].results.results[0].passed === false),
    "Runner should have run specs in second suite");
}

var testRunnerFinishCallback = function () {
  var runner = Runner();
  var foo = 0;

  runner.finish();

  reporter.test((runner.finished === true),
    "Runner finished flag was not set.");

  runner.finishCallback = function () {
    foo++;
  }

  runner.finish();

  reporter.test((runner.finished === true),
    "Runner finished flag was not set.");
  reporter.test((foo === 1),
    "Runner finish callback was not called");
}


var testNestedResults = function () {

  // Leaf case
  var results = nestedResults();

  results.push({passed: true, message: 'Passed.'});

  reporter.test((results.results.length === 1),
    "nestedResults.push didn't work");
  reporter.test((results.totalCount === 1),
    "nestedResults.push didn't increment totalCount");
  reporter.test((results.passedCount === 1),
    "nestedResults.push didn't increment passedCount");
  reporter.test((results.failedCount === 0),
    "nestedResults.push didn't ignore failedCount");

  results.push({passed: false, message: 'FAIL.'});

  reporter.test((results.results.length === 2),
    "nestedResults.push didn't work");
  reporter.test((results.totalCount === 2),
    "nestedResults.push didn't increment totalCount");
  reporter.test((results.passedCount === 1),
    "nestedResults.push didn't ignore passedCount");
  reporter.test((results.failedCount === 1),
    "nestedResults.push didn't increment failedCount");

  // Branch case
  var leafResultsOne = nestedResults();
  leafResultsOne.push({passed: true, message: ''});
  leafResultsOne.push({passed: false, message: ''});

  var leafResultsTwo = nestedResults();
  leafResultsTwo.push({passed: true, message: ''});
  leafResultsTwo.push({passed: false, message: ''});

  var branchResults = nestedResults();
  branchResults.push(leafResultsOne);
  branchResults.push(leafResultsTwo);

  reporter.test((branchResults.results.length === 2),
    "Branch Results should have 2 nestedResults, has " + branchResults.results.length);
  reporter.test((branchResults.totalCount === 4),
    "Branch Results should have 4 results, has " + branchResults.totalCount);
  reporter.test((branchResults.passedCount === 2),
    "Branch Results should have 2 passed, has " + branchResults.passedCount);
  reporter.test((branchResults.failedCount === 2),
    "Branch Results should have 2 failed, has " + branchResults.failedCount);
}

var testResults = function () {
  var runner = Runner();
  describe('one suite description', function () {
    it('should be a test', function() {
      runs(function () {
        this.expects_that(true).should_equal(true);
      });
    });
  });

  describe('another suite description', function () {
    it('should be another test', function() {
      runs(function () {
        this.expects_that(true).should_equal(false);
      });
    });
  });

  runner.execute();

  reporter.test((runner.results.totalCount === 2),
    'Expectation count should be 2, but was ' + runner.results.totalCount);
  reporter.test((runner.results.passedCount === 1),
    'Expectation Passed count should be 1, but was ' + runner.results.passedCount);
  reporter.test((runner.results.failedCount === 1),
    'Expectation Failed count should be 1, but was ' + runner.results.failedCount);
  reporter.test((runner.results.description === 'All Jasmine Suites'),
    'Jasmine Runner does not have the expected description, has: ' + runner.results.description);

}

var testReporterWithCallbacks = function () {
  jasmine = Jasmine.init();
  var runner = Runner();

  describe('Suite for JSON Reporter with Callbacks', function () {
    it('should be a test', function() {
      runs(function () {
        this.expects_that(true).should_equal(true);
      });
    });
    it('should be a failing test', function() {
      runs(function () {
        this.expects_that(false).should_equal(true);
      });
    });
  });
  describe('Suite for JSON Reporter with Callbacks 2', function () {
    it('should be a test', function() {
      runs(function () {
        this.expects_that(true).should_equal(true);
      });
    });

  });

  var foo = 0;
  var bar = 0;
  var baz = 0;

  var specCallback = function (results) {
    foo++;
  }
  var suiteCallback = function (results) {
    bar++;
  }
  var runnerCallback = function (results) {
    baz++;
  }

  jasmine.reporter = Jasmine.Reporters.reporter({
    specCallback: specCallback,
    suiteCallback: suiteCallback,
    runnerCallback: runnerCallback
  });
  runner.execute();

  reporter.test((foo === 3),
    'foo was expected to be 3, was ' + foo);
  reporter.test((bar === 2),
    'bar was expected to be 2, was ' + bar);
  reporter.test((baz === 1),
    'baz was expected to be 1, was ' + baz);
}

var testJSONReporter = function () {
  jasmine = Jasmine.init();
  var runner = Runner();

  describe('Suite for JSON Reporter, NO DOM', function () {
    it('should be a test', function() {
      runs(function () {
        this.expects_that(true).should_equal(true);
      });
    });
  });

  jasmine.reporter = Jasmine.Reporters.JSON();

  runner.execute();

  var expectedSpecJSON = '{"totalCount":1,"passedCount":1,"failedCount":0,"results":[{"passed":true,"message":"Passed."}],"description":"should be a test"}';
  var expectedSuiteJSON = '{"totalCount":1,"passedCount":1,"failedCount":0,"results":[{"totalCount":1,"passedCount":1,"failedCount":0,"results":[{"passed":true,"message":"Passed."}],"description":"should be a test"}],"description":"Suite for JSON Reporter, NO DOM"}';
  var expectedRunnerJSON = '{"totalCount":1,"passedCount":1,"failedCount":0,"results":[{"totalCount":1,"passedCount":1,"failedCount":0,"results":[{"totalCount":1,"passedCount":1,"failedCount":0,"results":[{"passed":true,"message":"Passed."}],"description":"should be a test"}],"description":"Suite for JSON Reporter, NO DOM"}],"description":"All Jasmine Suites"}';

  specJSON = jasmine.reporter.specJSON;
  reporter.test((specJSON === expectedSpecJSON),
    'JSON Reporter does not have the expected Spec results report.<br /> <b>Expected:</b><br /> ' + expectedSpecJSON +
    '<br /><b>Got:</b><br /> ' + specJSON);

  suiteJSON = jasmine.reporter.suiteJSON;
  reporter.test((suiteJSON === expectedSuiteJSON),
    'JSON Reporter does not have the expected Suite results report.<br /> <b>Expected:</b><br /> ' + expectedSuiteJSON +
    '<br /><b>Got:</b><br /> ' + suiteJSON);

  runnerJSON = jasmine.reporter.runnerJSON;
  reporter.test((runnerJSON === expectedRunnerJSON),
    'JSON Reporter does not have the expected Runner results report.<br /> <b>Expected:</b><br /> ' + expectedRunnerJSON +
    '<br /><b>Got:</b><br /> ' + runnerJSON);
}

var testJSONReporterWithDOM = function () {
  jasmine = Jasmine.init();
  var runner = Runner();

  describe('Suite for JSON Reporter/DOM', function () {
    it('should be a test', function() {
      runs(function () {
        this.expects_that(true).should_equal(true);
      });
    });
  });

  jasmine.reporter = Jasmine.Reporters.JSONtoDOM('json_reporter_results');
  runner.execute();

  var expectedJSONString = '{"totalCount":1,"passedCount":1,"failedCount":0,"results":[{"totalCount":1,"passedCount":1,"failedCount":0,"results":[{"totalCount":1,"passedCount":1,"failedCount":0,"results":[{"passed":true,"message":"Passed."}],"description":"should be a test"}],"description":"Suite for JSON Reporter/DOM"}],"description":"All Jasmine Suites"}';

  reporter.test((document.getElementById('json_reporter_results').innerHTML === expectedJSONString),
    'JSON Reporter with DOM did not write the expected report to the DOM, got:' + document.getElementById('json_reporter_results').innerHTML);
}

var testHandlesBlankSpecs = function () {
  jasmine = Jasmine.init();
  var runner = Runner();

  describe('Suite for handles blank specs', function () {
    it('should be a test with a blank runs block', function() {
      runs(function () {
      });
    });
    it('should be a blank (empty function) test', function() {
    });

  });
  runner.execute();

  reporter.test((runner.suites[0].specResults.length === 2),
    'Should have found 2 spec results, got ' + runner.suites[0].specResults.length);
  reporter.test((runner.suites[0].results.passedCount === 2),
    'Should have found 2 passing specs, got ' + runner.suites[0].results.passedCount);
}

var testFormatsExceptionMessages = function () {

  var sampleFirefoxException = {
    fileName: 'foo.js',
    line: '1978',
    message: 'you got your foo in my bar',
    name: 'A Classic Mistake'
  }

  var sampleWebkitException = {
    sourceURL: 'foo.js',
    lineNumber: '1978',
    message: 'you got your foo in my bar',
    name: 'A Classic Mistake'
  }

  var expected = 'A Classic Mistake: you got your foo in my bar in foo.js (line 1978)'

  reporter.test((Jasmine.Util.formatException(sampleFirefoxException) === expected),
    'Should have got ' + expected + ' but got: ' + Jasmine.Util.formatException(sampleFirefoxException));

  reporter.test((Jasmine.Util.formatException(sampleWebkitException) === expected),
    'Should have got ' + expected + ' but got: ' + Jasmine.Util.formatException(sampleWebkitException));
};

var testHandlesExceptions = function () {
  jasmine = Jasmine.init();
  var runner = Runner();

  //we run two exception tests to make sure we continue after throwing an exception
  describe('Suite for handles exceptions', function () {
    it('should be a test that fails because it throws an exception', function() {
      runs(function () {
        fakeObject.fakeMethod();
      });
    });

    it('should be another test that fails because it throws an exception', function() {
      runs(function () {
        fakeObject2.fakeMethod2();
      });
      runs(function () {
        this.expects_that(true).should_equal(true);
      });
    });


    it('should be a passing test that runs after exceptions are thrown', function() {
      runs(function () {
        this.expects_that(true).should_equal(true);
      });
    });

    it('should be another test that fails because it throws an exception after a wait', function() {
      runs(function () {
        var foo = 'foo';
      });
      waits(250);
      runs(function () {
        fakeObject3.fakeMethod();
      });
    });

    it('should be a passing test that runs after exceptions are thrown from a async test', function() {
      runs(function () {
        this.expects_that(true).should_equal(true);
      });
    });


  });
  runner.execute();
  Clock.tick(400); //TODO: setting this to a large number causes failures, but shouldn't

  reporter.test((runner.suites[0].specResults.length === 5),
    'Should have found 5 spec results, got ' + runner.suites[0].specResults.length);

  reporter.test((runner.suites[0].specs[0].expectationResults[0].passed === false),
    'First test should have failed, got passed');

  reporter.test((typeof runner.suites[0].specs[0].expectationResults[0].message.search(/fakeObject/) !== -1),
    'First test should have contained /fakeObject/, got ' + runner.suites[0].specs[0].expectationResults[0].message);

  reporter.test((runner.suites[0].specs[1].expectationResults[0].passed === false),
    'Second test should have a failing first result, got passed');

  reporter.test((typeof runner.suites[0].specs[1].expectationResults[0].message.search(/fakeObject2/) !== -1),
    'Second test should have contained /fakeObject2/, got ' + runner.suites[0].specs[1].expectationResults[0].message);

  reporter.test((runner.suites[0].specs[1].expectationResults[1].passed === true),
    'Second expectation in second test should have still passed');

  reporter.test((runner.suites[0].specs[2].expectationResults[0].passed === true),
    'Third test should have passed, got failed');

  reporter.test((runner.suites[0].specs[3].expectationResults[0].passed === false),
    'Fourth test should have a failing first result, got passed');

  reporter.test((typeof runner.suites[0].specs[3].expectationResults[0].message.search(/fakeObject3/) !== -1),
    'Fourth test should have contained /fakeObject3/, got ' + runner.suites[0].specs[3].expectationResults[0].message);
}


var testResultsAliasing = function () {
  jasmine = Jasmine.init();
  var runner = Runner();

  describe('Suite for result aliasing test', function () {

    it('should be a test', function() {
      runs(function () {
        this.expects_that(true).should_equal(true);
      });
    });

  });

  describe('Suite number two for result aliasing test', function () {
    it('should be a passing test', function() {
      runs(function () {
        this.expects_that(true).should_equal(true);
      });
    });

    it('should be a passing test', function() {
      runs(function () {
        this.expects_that(true).should_equal(true);
      });
    });

  });


  runner.execute();

  reporter.test((runner.suiteResults !== undefined),
    'runner.suiteResults was not defined');

  reporter.test((runner.suiteResults == runner.results.results),
    'runner.suiteResults should have been ' + reporter.toJSON(runner.results.results) +
    ', but was ' + reporter.toJSON(runner.suiteResults));

  reporter.test((runner.suiteResults[1] == runner.results.results[1]),
    'runner.suiteResults should have been ' + reporter.toJSON(runner.results.results[1]) +
    ', but was ' + reporter.toJSON(runner.suiteResults[1]));

  reporter.test((runner.suites[0].specResults !== undefined),
    'runner.suites[0].specResults was not defined');

  reporter.test((runner.suites[0].specResults == runner.results.results[0].results),
    'runner.suites[0].specResults should have been ' + reporter.toJSON(runner.results.results[0].results) +
    ', but was ' + reporter.toJSON(runner.suites[0].specResults));

  reporter.test((runner.suites[0].specs[0].expectationResults !== undefined),
    'runner.suites[0].specs[0].expectationResults was not defined');

  reporter.test((runner.suites[0].specs[0].expectationResults == runner.results.results[0].results[0].results),
    'runner.suites[0].specs[0].expectationResults should have been ' + reporter.toJSON(runner.results.results[0].results[0].results) +
    ', but was ' + reporter.toJSON(runner.suites[0].specs[0].expectationResults));

}


var runTests = function () {
  document.getElementById('spinner').style.display = "";

  testMatchersPrettyPrinting();
  testMatchersComparisons();
  testMatchersReporting();
  testDisabledSpecs();
  testDisabledSuites();
  testSpecs();
  testAsyncSpecs();
  testAsyncSpecsWithMockSuite();
  testWaitsFor();
  testWaitsForFailsIfTimeout();
  testSpecAfter();
  testSuites();
  testBeforeAndAfterCallbacks();
  testBeforeExecutesSafely();
  testAfterExecutesSafely();
  testSpecScope();
  testRunner();
  testRunnerFinishCallback();
  testNestedResults();
  testResults();
  testFormatsExceptionMessages();
  testHandlesExceptions();
  testResultsAliasing();
  testReporterWithCallbacks();
  testJSONReporter();
  testJSONReporterWithDOM();


//   handle blank specs will work later.
//      testHandlesBlankSpecs();
  

  reporter.summary();
  document.getElementById('spinner').style.display = "none";

};

