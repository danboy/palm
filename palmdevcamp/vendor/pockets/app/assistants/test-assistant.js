function TestAssistant() {
}

TestAssistant.prototype.setup = function() {
  //add the jasmine css
  var head = document.getElementsByTagName('head')[0];
  var cssTag = document.createElement('link');
  cssTag.rel = 'stylesheet';
  cssTag.type = 'text/css';
  cssTag.href = 'vendor/pockets/stylesheets/mojo_jasmine.css';

  head.appendChild(cssTag);

  // TODO: Fixy-McFixpants. if jasmine is already set (ie, we're running another test suite to test this test suite)
  // we will blow away our test suites' reporter. 
  if (!jasmine.reporter) {
    // TestAssistant has the callbacks of a Jasmine Reporter, so just set it.
    jasmine.reporter = this;
  }

  this.currentSuiteIndex = 0;
  this.testListWidgets = [];

  var specCount = 0;
  this.errorList = Widgets.errorListWidget({
    assistant: this,
    widgetId: "error-list",
    title: 'Errors'
  }, this.controller.stageController.pocketsTemplatePath);

  this.errorList.hide();

  var resultsDiv = this.controller.get('jasmine_results');

  this.suiteList = Widgets.suiteListWidget({
    parentElement: resultsDiv,
    assistant: this,
    widgetId: "suites",
    title: "Suites"
  }, this.controller.stageController.pocketsTemplatePath);

  for (var i = 0; i < jasmine.currentRunner.suites.length; i++) {
    specCount += jasmine.currentRunner.suites[i].specs.length;
    var widget = Widgets.testListWidget({
      parentElement: resultsDiv,
      assistant: this,
      widgetId: "suite_results_" + i,
      title: jasmine.currentRunner.suites[i].description
    }, this.controller.stageController.pocketsTemplatePath);
    this.testListWidgets.push(widget);
  }

  this.pill = Widgets.testProgressWidget({
    widgetId: 'progressPill',
    assistant: this,
    increment: specCount > 0 ? (1 / specCount) : 1
  });

}

TestAssistant.prototype.activate = function(event) {
  //  jasmine.execute();
}

TestAssistant.prototype.deactivate = function(event) {
};

TestAssistant.prototype.cleanup = function(event) {
};

/*
 * Jasmine Reporter interface & helper functions
 */

TestAssistant.prototype.reportSpecResults = function (results) {
  this.pill.increment();
  this.testListWidgets[this.currentSuiteIndex].addSpecResult(results);
  if (results.failedCount > 0) {
    if (results.failedCount == 1) {
      this.pill.displayOnFail();
      this.errorList.show();
    }

    this.errorList.addSpecResult(results, jasmine.currentRunner.suites[this.currentSuiteIndex].description);
  }
};

TestAssistant.prototype.reportSuiteResults = function (results) {
  this.suiteList.addSuite(results);
  this.currentSuiteIndex++;
};

TestAssistant.prototype.reportRunnerResults = function (results) {
  this.pill.finishedWith(results);
};