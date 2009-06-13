LabeledgroupAssistant = Class.create( ExampleAssistantBase, {
  setup : function($super) {
    $super();
	
	this.checkAttributes = {
		property: "value",
		trueValue: "ON",
		falseValue: "OFF",
		fieldName: 'checkboxstuff'
	};
	this.checkModel = {
		value: "ON",
		disabled: false
	};

	this.controller.setupWidget('sample-checkbox', this.checkAttributes, this.checkModel);
	
	this.controller.setupWidget('user-field',
			{   textReplacement : false,
				modelProperty : "text" });
	this.controller.setupWidget('pass-field');
	
  }
});
