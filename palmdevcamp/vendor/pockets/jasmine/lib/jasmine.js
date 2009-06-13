// Crockford's helpers

// Object.create instead of new Object
if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    var F = function () {
    };
    F.prototype = o;
    return new F();
  };
}

// Klass.method instead of Klass.prototype.name = function
if (typeof Function.method !== 'function') {
  Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
  }
}

/*
 * Jasmine internal classes & objects
 */

/*
 * object for holding results; allows for the results array to hold another nestedResults()
 *
 */
var nestedResults = function() {
  var that = {
    totalCount: 0,
    passedCount: 0,
    failedCount: 0,
    results: [],

    rollupCounts: function (result) {
      that.totalCount += result.totalCount;
      that.passedCount += result.passedCount;
      that.failedCount += result.failedCount;
    },

    push: function (result) {
      if (result.results) {
        that.rollupCounts(result);
      } else {
        that.totalCount++;
        result.passed ? that.passedCount++ : that.failedCount++;
      }
      that.results.push(result);
    },

    passed: function() {
      return that.passedCount === that.totalCount;
    }
  }

  return that;
}


/*
 * base for Runner & Suite: allows for a queue of functions to get executed, allowing for
 *   any one action to complete, including asynchronous calls, before going to the next
 *   action.
 *
 **/
var actionCollection = function () {
  var that = {
    actions: [],
    index: 0,
    finished: false,
    results: nestedResults(),

    finish: function () {
      if (that.finishCallback) {
        that.finishCallback();
      }
      that.finished = true;
    },

    report: function (result) {
      that.results.push(result);
    },

    execute: function () {
      if (that.actions.length > 0) {
        that.next();
      }
    },

    getCurrentAction: function () {
      return that.actions[that.index];
    },

    next: function() {
      if (that.index >= that.actions.length) {
        that.finish();
        return;
      }

      var currentAction = that.getCurrentAction();

      if (that.beforeEach) {
        if (!safeExecuteBeforeOrAfter(currentAction, that.beforeEach, that)) {
          return;
        };
      }

      currentAction.execute();

      if (currentAction.afterCallbacks) {
        for (var i = 0; i < currentAction.afterCallbacks.length; i++) {
          try {
            currentAction.afterCallbacks[i]();
          } catch (e) {
            alert(e);
          }
        }
      }

      that.waitForDone(currentAction);
    },

    waitForDone: function(action) {
      var afterExecute = function(){
        that.report(action.results);

        if (that.afterEach) {
          if (!safeExecuteBeforeOrAfter(action, that.afterEach, that)){
            return;
          }
        }

        that.index++;
        that.next();
      };
      
      if (action.finished) {
        afterExecute();
        return;
      }

      var id = setInterval(function () {
        if (action.finished) {
          clearInterval(id);
          afterExecute();
        }
      }, 150);
    }
  }

  return that;
}

var safeExecuteBeforeOrAfter = function(action, funk, suite){
  try {
    funk.apply(action);
    return true;
  } catch (e) {
    action.results.push({passed: false, message: ""});
    suite.report(action.results);
    suite.index++;
    suite.next();
    return false;
  }
};

/*
 * queuedFunction is how actionCollection's actions are implemented
 */
var queuedFunction = function(func, timeout, latchFunction, spec) {
  var that = {
    func: func,
    totalTimeSpentWaitingForLatch: 0,
    latchTimeoutIncrement: 100,

    next: function () {
      spec.finish(); // default value is to be done after one function
    },

    safeExecute: function () {
      try {
        that.func.apply(spec);
      } catch (e) {
        that.fail(e);
      }
    },

    execute: function () {
      var executeNow = function() {
        that.safeExecute();
        that.next();
      };

      var executeLater = function() {
        setTimeout(executeNow, timeout);
      };

      var executeNowOrLater = function() {
        var latchFunctionResult;

        try {
          latchFunctionResult = latchFunction.apply(spec);
        } catch (e) {
          that.fail(e);
          that.next();
          return;
        }

        if (latchFunctionResult) {
          executeNow();
        } else if (that.totalTimeSpentWaitingForLatch >= timeout) {
          that.fail({ name: 'timeout', message: '"waitsFor" timed out after ' + timeout + ' msec'});
          that.next();
        } else {
          that.totalTimeSpentWaitingForLatch += that.latchTimeoutIncrement;
          setTimeout(executeNowOrLater, that.latchTimeoutIncrement);
        }
      };

      if (latchFunction !== undefined) {
        executeNowOrLater();
      } else if (timeout > 0) {
        executeLater();
      } else {
        executeNow();
      }
    },

    fail: function(e) {
      spec.results.push({passed:false, message: Jasmine.Util.formatException(e)});
    }
  };
  return that;
};

/******************************************************************************
 * Jasmine
 ******************************************************************************/

var Jasmine = {}

Jasmine.init = function () {
  var that = {
    currentSpec: null,
    currentSuite: null,
    currentRunner: null,
    execute: function () {
      that.currentRunner.execute();
    }
  }
  return that;
}

var jasmine = Jasmine.init();

//pretty print a value
Jasmine.pp = function (value) {
  // private functions
  var isArray = function(value) {
    return value &&
           typeof value === 'object' &&
           typeof value.length === 'number' &&
           typeof value.splice === 'function' &&
           !(value.propertyIsEnumerable('length'));
  };

  var arrayToString= function(array) {
    var formatted_value = '';
    for (var i=0; i < array.length; i++) {
      if (i > 0) { formatted_value += ', '};
        formatted_value += ppValue(array[i]);
    }
    return '[ ' + formatted_value + ' ]';
  }

  var objectToString = function(obj) {
    var formatted_value = '';
    var first = true;
    for (property in obj) {
      if (first) {
        first = false;
      } else {
        formatted_value += ', ';
      }
      formatted_value += property;
      formatted_value += ' : ';
      formatted_value += ppValue(obj[property]);
    }

    return '{ ' + formatted_value + ' }';;
  }

  var ppValue = function (value) {
    if (value === undefined)         { return 'undefined'; }
    if (value === null)              { return 'null'; }
    if (typeof value === 'string')   { return "'" + value + "'"; }
    if (isArray(value))              { return 'Array'; }
    if (typeof value.nodeType === 'number') { return 'HTMLNode' }
    if (typeof value === 'object')   { return 'Object' }
    if (typeof value === 'function') { return 'Function' }
    return value.toString();
  }

  if (typeof value !== 'object' || value === null || typeof value.nodeType === 'number') {
    return ppValue(value);
  }
  if (isArray(value))     { return arrayToString(value); }

  return objectToString(value);
};

/*
 * Jasmine.Matchers methods; add your own with Jasmine.Matchers.method() - don't forget to write a test
 *
 */

Jasmine.Matchers = function (actual, results) {
  this.actual = actual;
  this.passing_message = 'Passed.'
  this.results = results || nestedResults();
}

Jasmine.Matchers.method('report', function (result, failing_message) {

  this.results.push({
    passed: result,
    message: result ? this.passing_message : failing_message
  });

  return result;
});

Jasmine.Matchers.method('should_equal', function (expected) {
  var equal = function(a, b) {
    if (a === undefined || a === null) {
      if (a == undefined && b === undefined) {
        return true;
      }
      else {
        return false;
      }
    }
    //Different type
    if (typeof a === "object" && typeof b === "object") {
      for (property in a) {
        if ((a[property] === undefined && b[property] !== undefined) || !equal(a[property], b[property])) {
          return false;
        }
      }
      for (property in b) {
        if ((b[property] === undefined && a[property] !== undefined) || !equal(a[property], b[property])) {
          return false;
        }
      }
      return true;
    }

    //Straight check
    return (a === b);
  };

  return this.report(equal(this.actual, expected),
      'Expected ' + Jasmine.pp(expected) + ' but got ' + Jasmine.pp(this.actual) + '.');
});

Jasmine.Matchers.method('should_not_equal', function (expected) {
  return this.report((this.actual !== expected),
      'Expected ' + Jasmine.pp(expected) + ' to not equal ' + Jasmine.pp(this.actual) + ', but it does.');
});

Jasmine.Matchers.method('should_match', function (reg_exp) {
  return this.report((new RegExp(reg_exp).test(this.actual)),
      'Expected ' + this.actual + ' to match ' + reg_exp + '.');
});

Jasmine.Matchers.method('should_not_match', function (reg_exp) {
  return this.report((!new RegExp(reg_exp).test(this.actual)),
      'Expected ' + this.actual + ' to not match ' + reg_exp + '.');
});

Jasmine.Matchers.method('should_be_defined', function () {
  return this.report((this.actual !== undefined),
      'Expected a value to be defined but it was undefined.');
});

/*
 * Jasmine spec constructor
 */

var it = function (description, func) {
  var that = {
    description: description,
    queue: [],
    currentTimeout: 0,
    currentLatchFunction: undefined,
    finished: false,
    afterCallbacks: [],

    results: nestedResults(),

    expects_that: function (actual) {
      return new Jasmine.Matchers(actual, that.results);
    },

    waits: function (timeout) {
      that.currentTimeout = timeout;
      that.currentLatchFunction = undefined;
      return that;
    },

    waitsFor: function(timeout, latchFunction) {
      that.currentTimeout = timeout;
      that.currentLatchFunction = latchFunction;
      return that;
    },

    resetTimeout: function() {
      that.currentTimeout = 0;
      that.currentLatchFunction = undefined;
    },

    finishCallback: function () {
      if (jasmine.reporter) {
        jasmine.reporter.reportSpecResults(that.results);
      }
    },

    finish: function() {
      that.finishCallback();
      that.finished = true;
    },

    after: function(doAfter){
      that.afterCallbacks.push(doAfter);
    },
    
    execute: function () {
      if (that.queue[0]) {
        that.queue[0].execute();
      }
      else {
        that.finish();
      }
    }
  };

  var addToQueue = function(func) {
    var currentFunction = queuedFunction(func, that.currentTimeout, that.currentLatchFunction, that);
    that.queue.push(currentFunction);

    if (that.queue.length > 1) {
      var previousFunction = that.queue[that.queue.length - 2];
      previousFunction.next = function () {
        currentFunction.execute();
      }
    }

    that.resetTimeout();
    return that;
  }

  that.expectationResults = that.results.results;
  that.runs = addToQueue;

  jasmine.currentSuite.specs.push(that);
  jasmine.currentSpec = that;

  if (func) {
    func();
  }

  that.results.description = description;
  return that;
}

//this mirrors the spec syntax so you can define a spec description that will not run. 
var xit = function() { return {runs: function () {} } };

var runs = function (func) {
  jasmine.currentSpec.runs(func);
}

var waits = function (timeout) {
  jasmine.currentSpec.waits(timeout);
}

var waitsFor = function (timeout, latchFunction) {
  jasmine.currentSpec.waitsFor(timeout, latchFunction);
}

var beforeEach = function (beforeEach) {
  jasmine.currentSuite.beforeEach = beforeEach;
}

var afterEach = function (afterEach) {
  jasmine.currentSuite.afterEach = afterEach;
}

var describe = function (description, spec_definitions) {
  var that = actionCollection();

  that.description = description;
  that.specs = that.actions;

  jasmine.currentSuite = that;
  jasmine.currentRunner.suites.push(that);

  spec_definitions();

  that.results.description = description;
  that.specResults = that.results.results;

  that.finishCallback = function () {
    if (jasmine.reporter) {
      jasmine.reporter.reportSuiteResults(that.results);
    }
  }

  return that;
}

var xdescribe = function(){
  return {execute: function(){}};
};

var Runner = function () {
  var that = actionCollection();

  that.suites = that.actions;
  that.results.description = 'All Jasmine Suites';

  that.finishCallback = function () {
    if (jasmine.reporter) {
      jasmine.reporter.reportRunnerResults(that.results);
    }
  }

  that.suiteResults = that.results.results;

  jasmine.currentRunner = that;
  return that;
}

jasmine.currentRunner = Runner();

/* JasmineReporters.reporter
 *    Base object that will get called whenever a Spec, Suite, or Runner is done.  It is up to
 *    descendants of this object to do something with the results (see json_reporter.js)
 */
Jasmine.Reporters = {};

Jasmine.Reporters.reporter = function (callbacks) {
  var that = {
    callbacks: callbacks || {},

    doCallback: function (callback, results) {
      if (callback) {
        callback(results);
      }
    },

    reportRunnerResults: function (results) {
      that.doCallback(that.callbacks.runnerCallback, results);
    },
    reportSuiteResults:  function (results) {
      that.doCallback(that.callbacks.suiteCallback, results);
    },
    reportSpecResults:   function (results) {
      that.doCallback(that.callbacks.specCallback, results);
    }
  }

  return that;
}

Jasmine.Util = {
  formatException: function(e) {
    //      if (typeof e === 'String') {
    //        return e;
    //      }
    var lineNumber;
    if (e.line) {
      lineNumber = e.line;
    }
    else if (e.lineNumber) {
      lineNumber = e.lineNumber;
    }

    var file;

    if (e.sourceURL) {
      file = e.sourceURL;
    }
    else if (e.fileName) {
      file = e.fileName;
    }

    var message = e.name + ': ' + e.message;
    if (file && lineNumber) {
      message += ' in ' + file + ' (line ' + lineNumber + ')';
    }

    return message;
  }

}
