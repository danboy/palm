ExampleAssistantBase = Class.create( OrientationHandlerAssistant, {
	  title : "",
	  description : "",
 	  hideheader : false,
	  initialize : function($super, title, description) {
	    this.title = title;
	    this.description = description;
		$super();
	  },
	
	activate : function($super){
		$super();
	},

    setup : function($super) {	
		//drop the template into the current window.
		var launchPage = Mojo.View.render({template: 'example-structure'});
		try{
			$('complete_example').update(launchPage);
			//set the title and description
			$('e_title').innerHTML = this.title;
			$('e_description').innerHTML = this.description;

			this.outputDisplay = this.controller.get('html_outputDisplay');

			$('style-item').insert($('e_example').innerHTML);
			if($('e_html').empty()){
				var item;
				if( item = $$('#style-item')[0]){
					this.outputDisplay.innerHTML = item.innerHTML.escapeHTML();
				}
			}else{
				this.outputDisplay.innerHTML = $('e_html').innerHTML.escapeHTML();
			}

			$('about_outputDisplay').insert($('e_about'));
			$('css_outputDisplay').insert($('e_css').innerHTML);
			$('e_css').remove();
			$('e_html').remove();
			$('e_example').remove();

			//conditionally hide empty collapsable item
			if($('e_about').empty()){
				$('about_section').hide().addClassName('not-used');
			}
			if($('css_outputDisplay').empty()){
				$('css_section').hide().addClassName('not-used');
			}
			if($('html_outputDisplay').empty()){
				$('html_section').hide().addClassName('not-used');
			}

			//now apply the stylesheet
			if(this.stylesheet && this.stylesheet != ""){
				console.log("loaded style sheet for this scene")
				Mojo.loadStylesheet(this.controller.document,"stylesheets/"+this.stylesheet+".css");
			}
			//set up scrolling for the html view
			this.controller.setupWidget('code_scroller', {mode: 'horizontal'});
			//set up scrolling for the css view
			this.controller.setupWidget('code_scroller_css', {mode: 'horizontal'});

			this.aboutDrawer = this.controller.get('aboutDrawer').hide();
			this.htmlDrawer = this.controller.get('htmlDrawer').hide();
			this.cssDrawer = this.controller.get('cssDrawer').hide();

			this.controller.listen('about_section', Mojo.Event.tap, this.handleDrawerSelection.bind(this, this.aboutDrawer));
			this.controller.listen('html_section', Mojo.Event.tap, this.handleDrawerSelection.bind(this, this.htmlDrawer));
			this.controller.listen('css_section', Mojo.Event.tap, this.handleDrawerSelection.bind(this, this.cssDrawer));
			
			if(this.hideheader){
				this.controller.get('example-structure-header').hide();
			}
			
			$super();
		}catch(e){
			console.log('Error in scene template, scene '+this.title+' will not load.');
			this.controller.stageController.popScene();
			return;
		}
    },

	ready : function(){
		var collapsables = $$('.collapsible:not(.not-used)');
		if(collapsables.size() == 1){
			this.toggleShowHideFolders(collapsables[0].up(),this.controller.window.innerHeight,true);
		}else if(collapsables.size() > 1 && !$('about_section').hasClassName('not-used')){
			this.toggleShowHideFolders($('about_section').up(),this.controller.window.innerHeight,true);
		}
	},

	deactivate : function($super) {
		if(this.stylesheet && this.stylesheet != ""){
			var styleSheetString = 'link[href="stylesheets/'+this.stylesheet+'.css"]';
			var mySheet = $$(styleSheetString)[0];
			mySheet.disabled = true;
			mySheet.remove();
		}
		$super();
	 },
     
	handleDrawerSelection: function(drawer, event) {

		Mojo.Log.info("handleDrawerSelection ");
		var targetRow = this.controller.get(event.target);
		if (!targetRow.hasClassName("selection_target")) {
			Mojo.Log.info("handleSoftwareSelection !selection_target" );
			targetRow = targetRow.up('.selection_target');
		}		
		
		if (targetRow) {
			var toggleButton = targetRow.down("div.arrow_button");
			if (!toggleButton.hasClassName('palm-arrow-expanded') && !toggleButton.hasClassName('palm-arrow-closed')) {
				return;
			}
			//var show = !drawer.mojo.getOpenState()
			var show = toggleButton.className;
			
			Mojo.Log.info("handleSoftwareSelection open/close " + show );
			this.toggleShowHideFolders(targetRow,this.controller.window.innerHeight);
		}
	},

	toggleShowHideFolders: function (rowElement, viewPortMidway,noScroll) {
		if (!rowElement.hasClassName("details")) {
			return;
		}

		var toggleButton = rowElement.down("div.arrow_button");
		if (!toggleButton.hasClassName('palm-arrow-expanded') && !toggleButton.hasClassName('palm-arrow-closed')) {
			return;
		}

		var showFavorites = toggleButton.hasClassName('palm-arrow-closed');
		var folderContainer = rowElement.down('.collapsor');
		var maxHeight = folderContainer.getHeight();
		if (showFavorites) {
			toggleButton.addClassName('palm-arrow-expanded');
			toggleButton.removeClassName('palm-arrow-closed');
			folderContainer.setStyle({ height:'1px' });
			folderContainer.show();

			// See if the div should scroll up a little to show the contents
			var elementTop = folderContainer.viewportOffset().top;
			var scroller = Mojo.View.getScrollerForElement(folderContainer);
			if (elementTop > viewPortMidway && scroller && !noScroll) {
				//Using setTimeout to give the animation time enough to give the div enough height to scroll to
				var scrollToPos = scroller.mojo.getScrollPosition().top - (elementTop - viewPortMidway);
				setTimeout(function() {scroller.mojo.scrollTo(undefined, scrollToPos, true);}, 200);
			}
		} else {
			folderContainer.setStyle({ height: maxHeight + 'px' });
			toggleButton.addClassName('palm-arrow-closed');
			toggleButton.removeClassName('palm-arrow-expanded');
		}
      var options = {reverse: !showFavorites,
					   onComplete: this.animationComplete.bind(this, showFavorites, rowElement.id, maxHeight),
					   curve: 'over-easy',
					   from: 1,
					   to: maxHeight,
					   duration: 0.4};
		Mojo.Animation.animateStyle(folderContainer, 'height', 'bezier', options);
	},
	
	animationComplete: function(show, accountId, listHeight, folderContainer, cancelled) {
		if (!show) {
			folderContainer.hide();
		}
		folderContainer.setStyle({height:'auto'});
	}
	
});