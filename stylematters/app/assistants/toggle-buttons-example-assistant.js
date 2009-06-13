ToggleButtonsExampleAssistant = Class.create( ExampleAssistantBase, {
	hideheader:true,
	attributes : {
		modelProperty: "value",
		trueValue: "ON",
		trueLabel: 'yes',
		falseValue: "OFF",
		falseLabel: 'no'
	},
	attributes2 : {
		modelProperty: "value"
	},
	attributes3 : {
		modelProperty: "value",
		trueValue: "ON",
		trueLabel: 'On',
		falseValue: "OFF",
		falseLabel: 'Off'
	},
	model : {
		value: "ON",
		disabled: false
	},
	model2 : {
		value: false
	},
	model3 : {
		value: true
	},
	model4 : {
		value: false
	},
	setup: function($super){
		$super();
		this.controller.setupWidget(Mojo.Menu.appMenu, {omitDefaultItems: false}, this.appMenuModel);
		this.controller.setupWidget('toggle0', this.attributes, this.model);
		this.controller.setupWidget('toggle1', this.attributes2, this.model2);
		this.controller.setupWidget('toggle2', this.attributes3, this.model3);
		this.controller.setupWidget('toggle3', this.attributes2, this.model4);
	}
});