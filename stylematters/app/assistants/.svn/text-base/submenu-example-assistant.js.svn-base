SubmenuExampleAssistant = Class.create( ExampleAssistantBase, {
	setup : function($super){
		$super();
		// Model for the scene's palm-view-menu
		this.cmdMenuModel = { label: $L('Menu Demo'), 
								items: [{label: $L('Category'), submenu:'category-menu'}]};
	this.controller.setupWidget(Mojo.Menu.commandMenu, undefined, this.cmdMenuModel);
	this.controller.setupWidget('category-menu', undefined, this.categoryMenuModel);
	},
	handleCommand: function(event) {
		if(event.type == Mojo.Event.command) {
			this.controller.get('menu-command-display').innerHTML = $L("Recieved command event: '") +event.command+"'.";
		}
	},
	categoryMenuModel: { label: $L('Category'), items: [{label: $L('All'), command:'all'}, 
									                {label: $L('Business'), command:'business' }, 
									                {label: $L('Personal'), command:'personal'}, 
													{label: $L('Future'), command:'future'},
													{label: $L('Current'), command:'current'},
									                {label: $L('Unfiled'), command:'unfiled'}
								]}
});
