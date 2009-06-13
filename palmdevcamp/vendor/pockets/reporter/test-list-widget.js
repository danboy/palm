if (Widgets === undefined) {
  var Widgets = {};
}

Widgets.testListWidget = function (options, templatePath) {
  options.listTemplate = templatePath !== undefined ? templatePath + 'test/suite' : 'test/suite';
  options.itemTemplate = templatePath !== undefined ? templatePath + 'test/result' : 'test/result';

  var that = Pockets.listWidget(options);

  that.helper = Widgets.testListWidgetHelper();

  that.addSpecResult = function(result) {
    that.addItemToList(that.helper.formatResult(result));
  };

  return that;
};

Widgets.suiteListWidget = function(options, templatePath) {
  options.listTemplate = templatePath !== undefined ? templatePath + 'test/suites' : 'test/suites';
  options.itemTemplate = templatePath !== undefined ? templatePath + 'test/suiteItem' : 'test/suiteItem';

  var listWidget = Pockets.listWidget(options);
  listWidget.addSuite = function(suite) {
    listWidget.addItemToList({
      cssClass: suite.passed() ? "passed" : "failed",
      suiteName: suite.description,
      passedCount: suite.passedCount,
      totalCount: suite.totalCount
    });
  };
  return listWidget;
};

// private methods for testListWidget

Widgets.testListWidgetHelper = function () {

  var that = {
    failureMessageOutput: function (result) {
      var output = '';
      for (i = 0; i < result.results.length; i++) {
        var expectationResult = result.results[i];
        if (!expectationResult.passed) {
          output += '<li>' + expectationResult.message + '</li>'
        }
      }

      if (output != '') {
        return result.passedCount + ' passed, ' + result.failedCount + ' failed<br /><br /><ul class="failureMessages">' + output + '</ul>';
      }
    },

    testPassed: function(result) {
      return (result.totalCount === result.passedCount);
    },


    formatResult: function (result) {
      return {
        cssClass: that.testPassed(result) ? 'passed' : 'failed',
        specDescription: result.description,
        failureMessages: that.failureMessageOutput(result)
      }
    }
  }

  return that;
}
