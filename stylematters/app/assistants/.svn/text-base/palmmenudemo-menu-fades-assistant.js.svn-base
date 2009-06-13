PalmmenudemoMenuFadesAssistant = Class.create( ExampleAssistantBase, {
	stylesheet: "palmmenudemo-menu-fades-example",
	setup : function($super){
		$super();
		// Model for the scene's palm-view-menu
		this.cmdMenuModel = { label: $L('Menu Demo'), 
								items: [{label: $L('label 1'), command:'label 1'}, 
										{label: $L('label 2'), command:'label 2'}
									]};
		this.controller.setupWidget(Mojo.Menu.commandMenu, undefined, this.cmdMenuModel);
	},
	handleCommand: function(event) {
		if(event.type == Mojo.Event.command) {
			this.controller.get('menu-command-display').innerHTML = $L("Recieved command event: '") +event.command+"'.";
		}
	}
});