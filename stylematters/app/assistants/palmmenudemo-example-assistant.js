PalmmenudemoExampleAssistant = Class.create( ExampleAssistantBase, {
  setup : function($super) {
	$super();
			// Model to use for the command menu.
			this.cmdMenuModel = { visible: true, items: [{ 
					items : [{label: $L('item')}, 
							{ label: 'Command Menu Item', expand:true}] 
						}]};

			// Model for the scene's palm-view-menu
			this.viewMenuModel = { label: $L('Menu Demo'), 
									items: [{label: $L('View Menu')}, 
											{label: $L('item'), submenu:'category-menu'}
										]};
			
			this.controller.setupWidget(Mojo.Menu.viewMenu, undefined, this.viewMenuModel);
			this.controller.setupWidget(Mojo.Menu.commandMenu, undefined, this.cmdMenuModel);
  }
});
