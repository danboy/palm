AboutAssistant = Class.create({
  about : null,

  initialize : function(about) {
	this.about = $(about).down('.about-style-item',0).innerHTML;
  },

  setup : function() {
	this.outputDisplay = this.controller.get('about_outputDisplay');	
	this.outputDisplay.innerHTML = this.about;
  }
  
});