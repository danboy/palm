describe('ErrorListWidget', function () {

  beforeEach(function () {
    this.assistant = {
      controller: amok.mock(Mojo.Controller.SceneController)
    }

    Pockets = amok.mock(function() {
    });
  });

  afterEach(function () {
    Pockets = realPockets();
  });


  it('should call Pockets.listWidget constructor', function () {
    runs(function () {
      options = {some_passed_option: 'foo'}

      Pockets.should_receive('listWidget').with_args({
        some_passed_option: 'foo',
        listTemplate: 'test/suite',
        itemTemplate: 'test/result'
      }).and_return({});

      var widget = Widgets.errorListWidget(options);

      this.expects_that(Pockets.getCallCountFor('listWidget')).should_equal(1);

    });
  });

  it('should take an optional pocketsTemplatePath argument and append it to the item and list templates if defined', function () {
        runs(function () {
      options = {some_passed_option:'foo'}

      Pockets.should_receive('listWidget').with_args({
        some_passed_option: 'foo',
        listTemplate: '/foo/test/suite',
        itemTemplate: '/foo/test/result'
      }).and_return({});

      var widget = Widgets.errorListWidget(options, '/foo/');

      this.expects_that(Pockets.getCallCountFor('listWidget')).should_equal(1);

    });
  });


  it('should have an addSpecResult method that calls formatResult and adds result text to listWidget', function () {
    runs(function () {
      mockListWidget = amok.mock(Mojo.doNothing);
      Pockets.should_receive('listWidget').and_return(mockListWidget);

      var widget = Widgets.errorListWidget({});

      var result = {"totalCount": 1,
        "passedCount": 0,
        "failedCount": 1,
        "results": [{"passed": false, "message": "Failed."}],
        "description": "should bar"};

      mockListWidget.should_receive('addItemToList').with_args({cssClass:'failed',
        specDescription:'FooSuite should bar.',
        failureMessages:'0 passed, 1 failed<br /><br /><ul class="failureMessages"><li>Failed.</li></ul>'});

      widget.addSpecResult(result, 'FooSuite');

      this.expects_that(mockListWidget.getCallCountFor('addItemToList')).should_equal(1);
    });
  });



  it('should show ErrorList when show is called', function () {
    runs(function () {
      mockListWidget = amok.mock(Mojo.doNothing);
      Pockets.should_receive('listWidget').and_return(mockListWidget);

      var widget = Widgets.errorListWidget({widgetId:'error', assistant:this.assistant});


      var stubErrorList = Mojo.View.convertToNode('<div id="error" x-mojo-element="List" style="display:none"></div>',document)

      this.assistant.controller.should_receive('get').with_args('error').and_return(stubErrorList);

      widget.show();

      this.expects_that(this.assistant.controller.getCallCountFor('get')).should_equal(1);
      this.expects_that(stubErrorList.style.display).should_equal('block');
    });
  });

  it('should hide ErrorList when hide is called', function () {
    runs(function () {
      mockListWidget = amok.mock(Mojo.doNothing);
      Pockets.should_receive('listWidget').and_return(mockListWidget);

      var widget = Widgets.errorListWidget({widgetId:'error', assistant:this.assistant});


      var stubErrorList = Mojo.View.convertToNode('<div id="error" x-mojo-element="List"></div>',document)

      this.assistant.controller.should_receive('get').with_args('error').and_return(stubErrorList);

      widget.hide();

      this.expects_that(this.assistant.controller.getCallCountFor('get')).should_equal(1);
      this.expects_that(stubErrorList.style.display).should_equal('none');
    });
  });

});

describe('ErrorListWidgetHelper', function () {

  it('should format a passing spec result properly', function () {
    runs(function () {

      var helper = Widgets.errorListWidgetHelper();

      var result = {"totalCount": 2,
        "passedCount": 2,
        "failedCount": 0,
        "results": [{"passed": true, "message": "Passed."}, {"passed": true, "message": "Passed."}],
        "description": "should totally foo"};

      formattedResult = helper.formatResult(result, 'FooSuite');

      this.expects_that(formattedResult.cssClass).should_equal('passed');
      this.expects_that(formattedResult.specDescription).should_equal('FooSuite should totally foo.');
      this.expects_that(formattedResult.failureMessages).should_equal(undefined);
    });
  });

  it('should format a failing spec result properly', function () {
    runs(function () {
      var helper = Widgets.errorListWidgetHelper();

      var result = {"totalCount": 1,
        "passedCount": 0,
        "failedCount": 1,
        "results": [{"passed": false, "message": "Failed."}],
        "description": "should totally foo"};

      formattedResult = helper.formatResult(result, 'FooSuite');

      this.expects_that(formattedResult.cssClass).should_equal('failed');
      this.expects_that(formattedResult.specDescription).should_equal('FooSuite should totally foo.');
      this.expects_that(formattedResult.failureMessages).should_equal('0 passed, 1 failed<br /><br /><ul class="failureMessages"><li>Failed.</li></ul>');
    });
  });

});