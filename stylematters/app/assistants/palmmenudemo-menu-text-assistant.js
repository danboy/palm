PalmmenudemoMenuTextAssistant = Class.create( ExampleAssistantBase, {
	stylesheet: "palmmenudemo-menu-text-example",
	setup : function($super){
		$super();
		// Model for the scene's palm-view-menu
		this.cmdMenuModel = { label: $L('Menu Demo'), 
								items: [{label: $L('Menu Buttons') , text: $L("text")},
										{label: $L('Foo'), command:'foo'}, 
										{label: $L('Donut'), command:'donut'}
									]};
		this.controller.setupWidget(Mojo.Menu.commandMenu, undefined, this.cmdMenuModel);
	},
	handleCommand: function(event) {
		if(event.type == Mojo.Event.command) {
			this.controller.get('menu-command-display').innerHTML = $L("Recieved command event: '") +event.command+"'.";
		}
	}
});