DrawersWithCustomUiAssistant = Class.create( ExampleAssistantBase, {
	button1Attributes : {
		disabledProperty: 'disabled',
		type: 'default'
	},
	button1Model : {
		buttonLabel : $L("open drawer"),
		whichLabel : function(open){
			return open?$L("open drawer"):$L("close drawer");
		},
		buttonClass: '',
		disabled: this.disabled
	},
	setup : function($super){
		$super();
		this.controller.setupWidget("halong_bay_scroller",this.attributes = {mode: 'horizontal'});
		this.drawerModel = {myOpenProperty:false};
		this.controller.setupWidget('listDrawer', {property:'myOpenProperty'}, this.drawerModel);
		this.drawer = this.controller.get('listDrawer');
		this.controller.setupWidget('button1', this.button1Attributes, this.button1Model);
		this.controller.listen('button1', Mojo.Event.tap, this.toggleDrawer.bindAsEventListener(this));
		this.button = this.controller.get('button1');
	},
	activate: function($super){
		$super();
		this.toggleDrawer();
	},
	// Button tap event handler that opens/closes the drawer.
	toggleDrawer: function(e) {
		this.button1Model.buttonLabel = this.button1Model.whichLabel(this.drawer.mojo.getOpenState());		
		this.controller.modelChanged(this.button1Model);
		this.drawer.mojo.setOpenState(!this.drawer.mojo.getOpenState());
	}
});