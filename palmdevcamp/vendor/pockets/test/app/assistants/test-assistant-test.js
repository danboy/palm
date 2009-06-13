describe('TestAssistant', function () {

  beforeEach( function () {
      this.testAssistant = new TestAssistant();

      this.realWidgets = Widgets;

      Widgets = amok.mock(Mojo.doNothing);

      this.testAssistant.controller = amok.mock(Mojo.Controller.SceneController);

  });

  afterEach( function () {
      Widgets = this.realWidgets;
  });


  it('should instantiate the appropriate widgets during setup', function() {
    runs(function () {
      var sceneDOM = Mojo.View.convertToNode('<div id="main">' + Mojo.View.render({template:'test/test-scene'}) + '</div>', document);
      if (sceneDOM.querySelector('#jasmine_results') === null) {
        //we must be running this test outside of the vendor/pockets root!
              var sceneDOM = Mojo.View.convertToNode('<div id="main">' + Mojo.View.render({template:'../../vendor/pockets/app/views/test/test-scene'}) + '</div>', document);
      }

      this.testAssistant.controller.should_receive('get').with_args('jasmine_results').and_return(sceneDOM.querySelector('#jasmine_results'));
      this.testAssistant.controller.should_receive('setupWidget');
      this.testAssistant.controller.should_receive('instantiateChildWidgets');
      this.testAssistant.controller.stageController = {pocketsTemplatePath:'',pocketsDocumentPath:''};

      var expectedErrorListArgs = {assistant: this.testAssistant,
        widgetId: 'error-list',
        title:'Errors'};

      var mockErrorList = amok.mock(function() {});

      Widgets.should_receive('errorListWidget').with_args(expectedErrorListArgs).and_return(mockErrorList);
      
      mockErrorList.should_receive('hide');

      var specCount = 0;

      var suiteCount = jasmine.currentRunner.suites.length;
      this.expects_that(suiteCount > 0).should_equal(true);

      Widgets.should_receive('suiteListWidget').with_args({
        parentElement: sceneDOM.querySelector('#jasmine_results'),
        assistant: this.testAssistant,
        widgetId: "suites",
        title: "Suites"
      });

      for (var i = 0; i < suiteCount; i++) {
        specCount += jasmine.currentRunner.suites[i].specs.length;
        Widgets.should_receive('testListWidget').with_args({
      parentElement: sceneDOM.querySelector('#jasmine_results'),
      assistant: this.testAssistant,
      widgetId: "suite_results_" + i,
      title: jasmine.currentRunner.suites[i].description
    });
      }

      var expectedTestProgressWidgetArgs = {assistant: this.testAssistant,
        widgetId: 'progressPill',
        increment: 1/specCount};

      Widgets.should_receive('testProgressWidget').with_args(expectedTestProgressWidgetArgs);


      this.testAssistant.setup();

      this.expects_that(this.testAssistant.controller.getCallCountFor('get')).should_equal(1);
      this.expects_that(Widgets.getCallCountFor('errorListWidget')).should_equal(1);
      this.expects_that(mockErrorList.getCallCountFor('hide')).should_equal(1);
      this.expects_that(Widgets.getCallCountFor("suiteListWidget")).should_equal(1);
      this.expects_that(Widgets.getCallCountFor('testListWidget') >= 1).should_equal(true);
      this.expects_that(Widgets.getCallCountFor('testProgressWidget')).should_equal(1);
    });
  });

  xit('should pass an optional pocketsTemplatePath option received at startup to list and error widgets', function() {
    runs(function () {
      var expectedPocketsTemplatePath = '/some/path/'
      var testAssistant = new TestAssistant({pocketsTemplatePath: expectedPocketsTemplatePath});

      Widgets = amok.mock(Mojo.doNothing);

      testAssistant.controller = amok.mock(Mojo.Controller.SceneController);

      var sceneDOM = Mojo.View.convertToNode('<div id="main">' + Mojo.View.render({template:'test/test-scene'}) + '</div>', document);
      if (sceneDOM.querySelector('#jasmine_results') === null) {
        //we must be running this test outside of the vendor/pockets root!
              var sceneDOM = Mojo.View.convertToNode('<div id="main">' + Mojo.View.render({template:'../../vendor/pockets/app/views/test/test-scene'}) + '</div>', document);
      }

      testAssistant.controller.should_receive('get').with_args('jasmine_results').and_return(sceneDOM.querySelector('#jasmine_results'));
      testAssistant.controller.should_receive('setupWidget');
      testAssistant.controller.should_receive('instantiateChildWidgets');

      expectedErrorListArgs = {assistant: testAssistant,
        widgetId: 'error-list',
        title:'Errors'};

      mockErrorList = amok.mock(function() {});

      Widgets.should_receive('errorListWidget').with_args(expectedErrorListArgs, expectedPocketsTemplatePath).and_return(mockErrorList);

      mockErrorList.should_receive('hide');

      var specCount = 0;

      for (var i = 0; i < jasmine.currentRunner.suites.length; i++) {
        specCount += jasmine.currentRunner.suites[i].specs.length;
        Widgets.should_receive('testListWidget').with_args({
        parentElement: sceneDOM.querySelector('#jasmine_results'),
        assistant: testAssistant,
        widgetId: "suite_results_" + i,
        title: jasmine.currentRunner.suites[i].description
      }, expectedPocketsTemplatePath);
      }

      Widgets.should_receive('testProgressWidget');


      testAssistant.setup();

      this.expects_that(Widgets.getCallCountFor('errorListWidget')).should_equal(1);
      this.expects_that(Widgets.getCallCountFor('testListWidget') >= 1).should_equal(true);
    });
  });

  it('should increment the pill, add a result to the proper list widget and error-list when a spec with a failed expectation is passed to reportSpecResults', function() {
      runs(function () {
        var failedResult = {"totalCount": 1,
          "passedCount": 0,
          "failedCount": 1,
          "results": [{"passed": false, "message": "Failed."}],
          "description": "should bar"};

        this.testAssistant.errorList = amok.mock(function() {});
        this.testAssistant.testListWidgets = [amok.mock(function() {})];
        this.testAssistant.pill = amok.mock(function() {});


        this.testAssistant.pill.should_receive('increment');
        this.testAssistant.pill.should_receive('displayOnFail');
        this.testAssistant.errorList.should_receive('addSpecResult').with_args(failedResult, jasmine.currentRunner.suites[0].description);
        this.testAssistant.errorList.should_receive('show');
        this.testAssistant.testListWidgets[0].should_receive('addSpecResult').with_args(failedResult);
        this.testAssistant.currentSuiteIndex = 0;

        this.testAssistant.reportSpecResults(failedResult);

        this.expects_that(this.testAssistant.pill.getCallCountFor('increment')).should_equal(1);
        this.expects_that(this.testAssistant.pill.getCallCountFor('displayOnFail')).should_equal(1);
        this.expects_that(this.testAssistant.errorList.getCallCountFor('addSpecResult')).should_equal(1);
        this.expects_that(this.testAssistant.errorList.getCallCountFor('show')).should_equal(1);
        this.expects_that(this.testAssistant.testListWidgets[0].getCallCountFor('addSpecResult')).should_equal(1);
      });
    });

   it('should increment currentSuiteIndex when reportSuiteResults is called', function() {
      runs(function () {
        var results = {};

        this.testAssistant.currentSuiteIndex = 0;
      this.testAssistant.suiteList = { addSuite: Mojo.doNothing };

        this.testAssistant.reportSuiteResults(results);

        this.expects_that(this.testAssistant.currentSuiteIndex).should_equal(1);

        this.testAssistant.reportSuiteResults(results);

        this.expects_that(this.testAssistant.currentSuiteIndex).should_equal(2);
      });
    });

    it('should call pill#finishedWith(results) when reportRunnerResults is called', function() {
      runs(function () {
        var results = {some_result_arg:'foo'};
        this.testAssistant.pill = amok.mock(function () {});

        this.testAssistant.pill.should_receive('finishedWith').with_args({some_result_arg:'foo'});

        this.testAssistant.reportRunnerResults(results);

        this.expects_that(this.testAssistant.pill.getCallCountFor('finishedWith')).should_equal(1);
      });
    });

    it('should show failed tests in an error list', function() {
      runs(function () {
        Widgets = this.realWidgets;
        var sceneController = Pockets.createSceneController(this, 'test');
        sceneController.assistant.reportSpecResults(Mom.failedResult());
        this.expects_that(sceneController.get('error-list').innerHTML).should_match(/should bar/);
      });
    });

  xit('should have a red progress bar if there is a failed test', function() {
    runs(function () {
      //PENDING
    });
  });
});