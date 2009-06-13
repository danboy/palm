function RssAssistant(feedApi, feedUrl) {
  this.feedApi = feedApi;
  this.feedUrl = feedUrl;
  this.feedModel = {items:[{}]};
}

RssAssistant.prototype.setup = function() {
	this.controller.setupWidget('feed-list',
  {itemTemplate:'rss/item', listTemplate:'rss/list'},
  this.feedModel);
}

RssAssistant.prototype.updateFeedModel = function(results) {
  this.feedModel.listTitle = results.feedTitle;
  this.feedModel.items = results.entries;
  this.controller.modelChanged(this.feedModel, this);
}

RssAssistant.prototype.activate = function(event) {
  this.feedApi.getFeed(this.feedUrl,this.updateFeedModel.bind(this));
	}


RssAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

RssAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
}
