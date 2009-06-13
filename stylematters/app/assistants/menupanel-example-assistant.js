MenupanelExampleAssistant = Class.create( ExampleAssistantBase, {
	stylesheet : "menupanel-example",
	hideheader : true,
	panelOpen : false,
	setup : function($super){
		$super();
		this.controller.listen('palm-header-show-hide-menupanel',Mojo.Event.tap, this.toggleMenuPanel.bindAsEventListener(this));
		this.controller.listen('scrim',Mojo.Event.tap, this.toggleMenuPanel.bindAsEventListener(this));
		this.exampleMenuPanel = this.controller.get('example-menu-panel');
		this.scrim = this.controller.get('scrim');
		this._dragHandler = this._dragHandler.bindAsEventListener(this);
		this.menuPanelContainer = this.controller.get('menu-panel-container');
		
		//preset the menupanel hidden
		this.exampleMenuPanel.setStyle({height:0});
		this.controller.get('scrim').hide();
		this.menuPanelContainer.hide();
	},
	toggleScrim : function(){
		this.scrim.toggle();
		this.menuPanelContainer.toggle();
		this.panelOpen?this.disableSceneScroller():this.enableSceneScroller();
	},
	toggleMenuPanel : function(e){
		this.panelOpen = !this.panelOpen;
		this.panelOpen?this.toggleScrim():null;
		Mojo.Animation.animateStyle(this.exampleMenuPanel, 'height', 'bezier', {
					from: 270,
					to: 0,
					duration: .5,
					curve:'over-easy',
					reverse:this.panelOpen,
					onComplete: this.panelOpen?undefined:this.toggleScrim.bind(this)
				}
		);
	},
	/*
	 * Disable the scene scroller to prevent the web view from scrolling underneath whatever is being displayed on top of it
	 */
	disableSceneScroller : function() {
		this.controller.listen(this.controller.sceneElement, Mojo.Event.dragStart, this._dragHandler);
	},
	/** @private */
	_dragHandler: function(event) {
		// prevents the scene from scrolling.
		event.stop();
	},
	/*
	 * Enable the scene scroller (everything back to normal)
	 */
	enableSceneScroller : function() {
		this.controller.stopListening(this.controller.sceneElement, Mojo.Event.dragStart, this._dragHandler);
	}
});