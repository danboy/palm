var FeedApi = function() {

  var that = {
    ajax: Ajax,
    getFeed: function(url, callback) {
      var processResults = function (ajaxResponse) {
        var jsonResults = that.rssToJson(ajaxResponse.responseText);
        callback(jsonResults);
      };
      new this.ajax.Request(url, {method: 'get', onComplete:processResults, onFailure: function() {alert('Could not retrieve feed.');}});
    },
    rssToJson: function(rssString) {
      var json = {entries:[]};
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(rssString, "text/xml");

      var feedTitleIterator = xmlDoc.evaluate('//channel/title', xmlDoc, null, XPathResult.ANY_TYPE, null);
      json.feedTitle=feedTitleIterator.iterateNext().textContent;


      var titleIterator = xmlDoc.evaluate('//channel/item/title', xmlDoc, null, XPathResult.ANY_TYPE, null);
      var title=titleIterator.iterateNext();
      while(title) {
        json.entries.push({title:title.textContent});
        title = titleIterator.iterateNext();
      }
      return json;
    }
  };

  return that;
};