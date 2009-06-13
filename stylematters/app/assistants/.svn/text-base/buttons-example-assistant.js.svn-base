ButtonsExampleAssistant = Class.create( ExampleAssistantBase, {
	button1Attributes : {
		disabledProperty: 'disabled',
		type: 'default'
	},
	button2Attributes : {
		disabledProperty: 'disabled',
		type: 'default'
	},
	button3Attributes : {
		disabledProperty: 'disabled',
		type: 'default'
	},
	button4Attributes : {
		disabledProperty: 'disabled',
		type: Mojo.Widget.activityButton
	},
	button1Model : {
		buttonLabel : "Primary Button",
		buttonClass: 'primary',
		disabled: this.disabled
	},
	button2Model : {
		buttonLabel : "Secondary Button",
		buttonClass: 'secondary',
		disabled: this.disabled
	},
	button3Model : {
		buttonLabel : "Affirmative Button",
		buttonClass: 'affirmative',
		disabled: this.disabled
	},
	button4Model : {
		buttonLabel : "Negative Button",
		buttonClass: 'negative',
		disabled: this.disabled
	},
	setup : function($super){
		$super();
		this.controller.setupWidget('button1', this.button1Attributes, this.button1Model);
		this.controller.setupWidget('button2', this.button2Attributes, this.button2Model);
		this.controller.setupWidget('button3', this.button3Attributes, this.button3Model);
		this.controller.setupWidget('button4', this.button4Attributes, this.button4Model);
	}
});