CheckboxesExampleAssistant = Class.create( ExampleAssistantBase, {
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
	
	model_2 : {
		value: "OFF",
		disabled: false
	},
	
	model_3 : {
		value: "ON",
		disabled: true
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
		
		this.controller.setupWidget('sample-checkbox-2', this.attributes, this.model_2);
		this.controller.listen('sample-checkbox-2', Mojo.Event.propertyChange, this.selectorChanged.bindAsEventListener(this));
		
		this.controller.setupWidget('sample-checkbox-3', this.attributes, this.model_3);
		this.controller.listen('sample-checkbox-3', Mojo.Event.propertyChange, this.selectorChanged.bindAsEventListener(this));
	},

	selectorChanged : function(e) {
		
	}
});