describe('FeedApi', function () {


  it('should call a function with feed results on completion', function() {
    runs(function () {
      var sampleFeedString = '<rss version="0.91">' +
                             '<channel>' +
                             '<title>Sample.com</title>' +
                             '<link>http://www.foobar.com/</link>' +
                             '<description>Feed description.</description>' +
                             '<language>en-us</language>' +
                             '<item>' +
                             '<title>Foobars in love!</title>' +
                             '<link>http://www.foo.com</link>' +
                             '<description>Item Description.</description>' +
                             '</item>' +
                             '<item>' +
                             '<title>Foo spring is here!</title>' +
                             '<link>http://www.foo.com</link>' +
                             '<description>Item Description.</description>' +
                             '</item>' +
                             '</channel>' +
                             '</rss>';
      var stubAjaxResponse = {responseText:sampleFeedString};
      var fakeAjaxRequest = function(feedUrl, options) {
        options.onComplete(stubAjaxResponse);
      };

      var feedApi = new FeedApi();
      feedApi.ajax.Request = fakeAjaxRequest;

      var that = this;
      var callback = function(results) {
        that.feedResults = results;
      };

      var expectedResults = {
        feedTitle: 'Sample.com',
        entries: [{title:'Foobars in love!'},
                  {title:'Foo spring is here!'}]
      };

      feedApi.getFeed('http://fakefeed.com', callback);

      this.expects_that(this.feedResults).should_equal(expectedResults);
    });
  });

it('should return results from a live feed', function() {
      runs(function () {
        var feedApi = new FeedApi();

        var that = this;
        var callback = function(results) {
          that.feedResults = results;
        };
        feedApi.getFeed('http://pivotallabs.com/blabs.rss', callback);

      });
      waits(2000);
      runs(function () {
        this.expects_that(this.feedResults.entries.length > 0).should_equal(true);
      });
    });



});