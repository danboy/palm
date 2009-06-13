HtmlviewAssistant = Class.create({
	
  viewHtml : null,
	
  initialize : function(element) {
	console.log(element);
	//$(element).down('.about-style-item',0).remove();
	this.viewHtml = element;
  },
  
  setup : function() {
	this.outputDisplay = this.controller.get('html_outputDisplay');	
	this.outputDisplay.value = this.viewHtml;
  },
  
  createCleanHTMLText : function(element,html){
	return cleanHtml;
  }

});