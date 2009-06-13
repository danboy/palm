if (Widgets === undefined) {
  var Widgets = {};
}

Widgets.testProgressWidget = function (options) {
  var pill = {percent:0.0, title: 'Running Specs...', icon:'cannot be blank'};
  var helper = Widgets.testProgressWidgetHelper();

  that = {
    increment:function() {
      pill.percent += options.increment;
      options.assistant.controller.modelChanged(pill, options.assistant);
    },

    finishedWith: function(results) {
      if (helper.testPassed(results)) {
        pill.title = 'All ' + results.passedCount + ' Expectations Passed';
      } else {
        pill.title = results.failedCount + ' of ' + results.totalCount + ' Expectations Failed';
      }

      options.assistant.controller.modelChanged(pill, options.assistant);
    },
    displayOnFail: function () {
      options.assistant.controller.get(options.widgetId).querySelector('.file-download-progress').className += ' fail';
      options.assistant.controller.get(options.widgetId).querySelector('.download-pill').className += ' fail';
    }
  }

  options.assistant.controller.setupWidget(options.widgetId, {cancellable: false,
    modelProperty: 'percent'}, pill);
  return that;
}


Widgets.testProgressWidgetHelper = function () {

  return {
    testPassed:function(result) {
      return (result.totalCount === result.passedCount);
    }
  }
}
