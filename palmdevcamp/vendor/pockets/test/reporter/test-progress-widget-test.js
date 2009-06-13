describe('TestProgressWidget ', function () {

  beforeEach(function () {
    this.assistant = {controller: amok.mock(Mojo.Controller.SceneController)};
  });


  it('should have a constructor that calls Mojo\'s setupWidget', function() {
    runs(function () {
      this.assistant.controller.should_receive('setupWidget').with_args('progress',
      {cancellable: false,
        modelProperty: 'percent'},
      {percent:0.0, title: 'Running Specs...', icon:'cannot be blank'});

      var widget = Widgets.testProgressWidget({assistant: this.assistant, widgetId: 'progress'});

      this.expects_that(this.assistant.controller.getCallCountFor('setupWidget')).should_equal(1);

    });
  });

  it('should have an increment method that increments progress', function() {
    runs(function () {
      this.assistant.controller.should_receive('setupWidget');

      var widget = Widgets.testProgressWidget({assistant: this.assistant, widgetId: 'progress', increment: 0.2});

      this.assistant.controller.should_receive('modelChanged').with_args({percent:0.2, title: 'Running Specs...', icon:'cannot be blank'});

      widget.increment();

      this.expects_that(this.assistant.controller.getCallCountFor('modelChanged')).should_equal(1);

    });
  });

  it('should set the title & icon correctly when all specs pass.', function() {
    runs(function() {
      this.assistant.controller.should_receive('setupWidget');

      var widget = Widgets.testProgressWidget({assistant: this.assistant, widgetId: 'progress', increment: 0.2});

      var passingSpecRun = {
        totalCount: 4,
        passedCount: 4,
        failedCount: 0
      }

      this.assistant.controller.should_receive('modelChanged').with_args({percent:0.0, title: "All 4 Expectations Passed", icon:'cannot be blank'});

      widget.finishedWith(passingSpecRun);

      this.expects_that(this.assistant.controller.getCallCountFor('modelChanged')).should_equal(1);

    });
  });

  it('should set the title & icon correctly when there is one failing spec.', function() {
    runs(function() {
      this.assistant.controller.should_receive('setupWidget');

      var widget = Widgets.testProgressWidget({assistant: this.assistant, widgetId: 'progress', increment: 0.2});

      var failingSpecRun = {
        totalCount: 4,
        passedCount: 3,
        failedCount: 1
      }

      this.assistant.controller.should_receive('modelChanged').with_args({percent:0.0, title: "1 of 4 Expectations Failed", icon:'cannot be blank'});

      widget.finishedWith(failingSpecRun);

      this.expects_that(this.assistant.controller.getCallCountFor('modelChanged')).should_equal(1);

    });
  });

  it('should change the proper CSS classes when displayRedProgressPill is called', function() {
    runs(function() {
      var progressPillBoilerplate = '<div class="download-pill" id="palm_anon_element_0testprogressPill_downloadPill">' +
                                    '<div id="palm_anon_element_0testprogressPill_imageContent"></div>' +
                                    '<div id="palm_anon_element_0testprogressPill_titleContent">' +
                                    '<div class="download-filename">1 Expectations Failed</div>' +
                                    '</div>' +
                                    '<div id="palm_anon_element_0testprogressPill_iconContent" class="cannot be blank"></div>' +
                                    '<!--	<div id="palm_anon_element_0testprogressPill_cancelButton" class="action-icon "></div>' +
                                    '<div id="button-" x-palm-ticket="" class="action-icon "></div>-->' +
                                    '</div>' +
                                    '<div id="palm_anon_element_0testprogressPill_progress" class="file-download-progress" style="clip: rect(0px 320px 48px 668px); "></div>';
      var progressPillElement = Mojo.View.convertToNode('<div id="progress" x-mojo-element="ProgressPill">' + progressPillBoilerplate + '</div>', document);

      this.assistant.controller.should_receive('setupWidget');

      var widget = Widgets.testProgressWidget({assistant: this.assistant, widgetId: 'progress', increment: 0.2});

      this.assistant.controller.should_receive('get').times(2).with_args('progress').and_return(progressPillElement, progressPillElement);

      widget.displayOnFail();

      this.expects_that(this.assistant.controller.getCallCountFor('get')).should_equal(2);
      this.expects_that(progressPillElement.querySelector('.file-download-progress').className).should_match('fail');
      this.expects_that(progressPillElement.querySelector('.download-pill').className).should_match('fail');
    });
  });

});
