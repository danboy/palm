describe('TestListWidget ', function () {

  beforeEach(function () {
    Pockets = amok.mock(function() {
    });
  });

  afterEach(function () {
    Pockets = realPockets();
  })

  it('should call Pockets.listWidget in its constructor', function() {
    runs(function () {
      options = {some_passed_option: 'foo'}

      Pockets.should_receive('listWidget').with_args({
        some_passed_option: 'foo',
        listTemplate: 'test/suite',
        itemTemplate: 'test/result'
      }).and_return({});

      var widget = Widgets.testListWidget(options);

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

      var widget = Widgets.testListWidget(options, '/foo/');

      this.expects_that(Pockets.getCallCountFor('listWidget')).should_equal(1);

    });
  });

  it('should have an addSpecResult method that calls formatResult and adds result text to listWidget', function () {
    runs(function () {
      mockListWidget = amok.mock(Mojo.doNothing);
      Pockets.should_receive('listWidget').and_return(mockListWidget);

      var widget = Widgets.testListWidget({});

      var result = {"totalCount": 1,
        "passedCount": 0,
        "failedCount": 1,
        "results": [{"passed": false, "message": "Failed."}],
        "description": "should bar"};

      mockListWidget.should_receive('addItemToList').with_args({cssClass:'failed',
        specDescription:'should bar',
        failureMessages:'0 passed, 1 failed<br /><br /><ul class="failureMessages"><li>Failed.</li></ul>'});

      widget.addSpecResult(result);

      this.expects_that(mockListWidget.getCallCountFor('addItemToList')).should_equal(1);
    });
  });

});

describe('TestListWidgetHelper', function () {

  it('should format a passing spec result properly', function () {
    runs(function () {

      var helper = Widgets.testListWidgetHelper();

      var result = {"totalCount": 2,
        "passedCount": 2,
        "failedCount": 0,
        "results": [{"passed": true, "message": "Passed."}, {"passed": true, "message": "Passed."}],
        "description": "foo"};

      formattedResult = helper.formatResult(result);

      this.expects_that(formattedResult.cssClass).should_equal('passed');
      this.expects_that(formattedResult.specDescription).should_equal('foo');
      this.expects_that(formattedResult.failureMessages).should_equal(undefined);
    });
  });

  it('should format a failing spec result properly', function () {
    runs(function () {
      var helper = Widgets.testListWidgetHelper();

      var result = {"totalCount": 1,
        "passedCount": 0,
        "failedCount": 1,
        "results": [{"passed": false, "message": "Failed."}],
        "description": "foo"};

      formattedResult = helper.formatResult(result);

      this.expects_that(formattedResult.cssClass).should_equal('failed');
      this.expects_that(formattedResult.specDescription).should_equal('foo');
      this.expects_that(formattedResult.failureMessages).should_equal('0 passed, 1 failed<br /><br /><ul class="failureMessages"><li>Failed.</li></ul>');
    });
  });

});