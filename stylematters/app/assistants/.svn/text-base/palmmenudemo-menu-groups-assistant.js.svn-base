PalmmenudemoMenuGroupsAssistant = Class.create( ExampleAssistantBase, {
	setup : function($super){
		$super();
		this.cmdMenuModel = { label: $L('Menu Demo'), 
								items: [
										{label: $L('Back/Fwd'), toggleCmd:'back', items:[
											{label: $L('Back'), icon:'back', command:'back'},
											{label: $L('Forward'), icon:'forward', command:'fwd'}
										]},

										{label: $L('Stuff'), items:[
											{label: $L('Refresh'), icon:'refresh', command:'rfsh'},
											{label: $L('Search'), icon:'search', command:'search'}
										]},

										{label: $L('New Thing'), icon:'new', command:'newthing'}
									]};
	this.controller.setupWidget(Mojo.Menu.commandMenu, undefined, this.cmdMenuModel);
	},
	
	handleCommand: function(event) {
		if(event.type == Mojo.Event.command) {
			this.controller.get('menu-command-display').innerHTML = $L("Recieved command event: '") +event.command+"'.";
		}
	},
});