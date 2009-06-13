TypographyBasicStylesAssistant = Class.create( ExampleAssistantBase, {
	attributes : {
		property: "value",
		trueValue: "ON",
		falseValue: "OFF",
		fieldName: 'checkboxstuff'
	},
	
	model_1 : {
		value: "ON",
		disabled: false
	},
	
	setup: function($super){
		$super();
		this.attributes = {
			property: "value",
			trueValue: "ON",
			falseValue: "OFF",
			fieldName: 'checkboxstuff'
		};
		this.model = {
			value: "ON",
			disabled: false
		};

		this.controller.setupWidget('sample-checkbox-1', this.attributes, this.model_1);
		this.controller.listen('sample-checkbox-1', Mojo.Event.propertyChange, this.selectorChanged.bindAsEventListener(this));
			},

	selectorChanged : function(e) {
		
	}
});