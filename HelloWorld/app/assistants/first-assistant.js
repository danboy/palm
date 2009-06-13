function FirstAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

FirstAssistant.prototype.setup = function() {
// set the initial total and display it
  this.count = 0;
  this.getFeed;
}

FirstAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
	   window.setInterval(this.getFeed.bind(this),10000)
}


FirstAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

FirstAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
}


FirstAssistant.prototype.getFeed = function(event) {
  //url = 'http://www.pinmonkey.com/pages/1.rss';
  url = 'http://api.flickr.com/services/feeds/photos_public.gne?id=22291106@N00&lang=en-us&format=rss_200';
  var request = new Ajax.Request(url, {
     method: 'get',
     evalJSON: 'false',
     onComplete: this.showFeed.bind(this),
     onFailure: this.failure.bind(this)
  });
}

FirstAssistant.prototype.showFeed = function(request) {
	// Use responseText, not responseXML!! try: reponseJSON
	  this.count++
	   var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(request.responseText, "text/xml");
      var feedTitleIterator = xmlDoc.evaluate('//channel/title', xmlDoc, null, XPathResult.ANY_TYPE, null);
      var contentIterator = xmlDoc.evaluate('//channel/item/description', xmlDoc, null, XPathResult.ANY_TYPE, null);
      for(i=0;i<this.count;i++){
      var description= contentIterator.iterateNext();
      }
      var title= feedTitleIterator.iterateNext();
  jeep = description.textContent || "wtf"
  this.controller.get('content').update(jeep)
  this.controller.get('storyViewTitle').update(title.textContent)

}
FirstAssistant.prototype.failure = function(event) {
  this.controller.get('count').update('failure').bind(this)
}
