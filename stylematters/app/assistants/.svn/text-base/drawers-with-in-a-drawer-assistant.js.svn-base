DrawersWithInADrawerAssistant = Class.create( ExampleAssistantBase, {
	setup : function($super){
		$super();
		$$("div.drawer-button").each(this.buttonSetup.bind(this));
		$$("div.drawer").each(this.drawerWidgetSetup.bind(this));
	},
	buttonSetup: function(item, s){
		this.controller.listen(item, Mojo.Event.tap, this.toggleDrawerByTarget.bindAsEventListener(this));
	},
	drawerWidgetSetup : function(item, s){
		item.writeAttribute('id','example-drawer'+s);
		var id = item.getAttribute('id');
		this.controller.setupWidget(id, {property:'myOpenProperty'});
	},
	activate: function($super){
		$super();
		$$('div.drawer').each(function(item){
			item.mojo.setOpenState(true);
		});
	},
	toggleDrawerByTarget: function(event) {
		var targetRow = this.controller.get(event.target);
		var drawer = targetRow.up("div.palm-row").next('div.drawer');
		this.controller.get(drawer).mojo.setOpenState(!this.controller.get(drawer).mojo.getOpenState());
	}
});