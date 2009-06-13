describe('RssAssistant', function () {
  it('should display the titles of a feed after a scene is pushed', function() {
    runs(function () {
      var feedApi = FeedApi();

      var stubFeedApiResponse = {feedTitle:'Foo news!', entries:[ {title:'Foo is great!'},{title:'Bar is also good'}]}
      var fakeGetFeed = function (url, callback) {
        this.passedUrl = url;
        callback(stubFeedApiResponse);
      };

      feedApi.getFeed = fakeGetFeed.bind(this);

      var feedUrl ='http://foo.com/foo';

      var sceneController = Pockets.createSceneController(this, 'rss', feedApi, feedUrl);

      this.expects_that(this.passedUrl).should_equal(feedUrl);

      var feedList = sceneController.get('feed-list');
      this.expects_that(feedList.attributes['x-mojo-element'].value).should_equal('List');
      this.expects_that(feedList).should_not_equal(null);

      var listTitle = feedList.querySelector('.palm-group-title');
      this.expects_that(listTitle.innerHTML).should_match('Foo news!');

      var rows = feedList.querySelectorAll('.row');
      this.expects_that(rows.length).should_equal(2);

      this.expects_that(rows[0].innerHTML).should_match('Foo is great!');
      this.expects_that(rows[1].innerHTML).should_match('Bar is also good');
    
    });
  });


  //This test was used to 'drive' the list display in this scene during the demonstration.
  // It is no longer applicable, and thus would normally be deleted
  xit('should display a list of arguments that are passed to the scene', function() {
    runs(function () {
      var sceneController = Pockets.createSceneController(this, 'rss', 'foo', 'bar', 'baz');
   var argumentList = sceneController.get('argument-list');
      this.expects_that(argumentList.attributes['x-mojo-element'].value).should_equal('List');
      this.expects_that(argumentList).should_not_equal(null);

      var listTitle = argumentList.querySelector('.palm-group-title');
      this.expects_that(listTitle.innerHTML).should_match('Argument');

      var rows = argumentList.querySelectorAll('.row');
      this.expects_that(rows.length).should_equal(3);

      this.expects_that(rows[0].innerHTML).should_match('foo');
      this.expects_that(rows[1].innerHTML).should_match('bar');
      this.expects_that(rows[2].innerHTML).should_match('baz');
    });
  });
});