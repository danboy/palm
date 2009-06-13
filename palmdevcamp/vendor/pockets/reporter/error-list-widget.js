if (Widgets === undefined) {
  var Widgets = {}
}

Widgets.errorListWidget = function (options, templatePath) {
  options.listTemplate = templatePath !== undefined ? templatePath + 'test/suite': 'test/suite';
  options.itemTemplate = templatePath !== undefined ? templatePath + 'test/result': 'test/result';

  var that = Pockets.listWidget(options);

  that.helper = Widgets.errorListWidgetHelper();

  that.addSpecResult = function(result, suiteDescription) {
    that.addItemToList(that.helper.formatResult(result, suiteDescription));
  }

  that.show = function() {
      options.assistant.controller.get(options.widgetId).style.display = 'block';
  };
      
  that.hide = function() {
       options.assistant.controller.get(options.widgetId).style.display = 'none';
  };

  return that;
}

Widgets.errorListWidgetHelper = function () {
  var that = Widgets.testListWidgetHelper();
  that.formatResult = function (result, suiteDescription) {
    return {
      cssClass: that.testPassed(result) ? 'passed' : 'failed',
      specDescription: suiteDescription + ' ' + result.description + '.',
      failureMessages: that.failureMessageOutput(result)
    }
  }
  return that;
}