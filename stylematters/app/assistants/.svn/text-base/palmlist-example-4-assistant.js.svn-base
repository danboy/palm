PalmlistExample4Assistant = Class.create( ExampleAssistantBase, {
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
	
	this.controller.setupWidget('sample-toggle', {unstyled:true});

	this.controller.setupWidget('work-selector', {label: $L('Work'), choices: this.work});
	
  },

  work: [
  	{label:$L('Assiduous'), value:"assiduous", secondaryIcon:'status-away'}, 
  	{label:$L('Diligent'), value:"diligent"}, 
  	{label:$L('Earnest'), value:"earnest"},
  	{label:$L('Easy'), value:"easy"},
  	{label:$L('Hard'), value:"hd"},
  	{label:$L('Hardly'), value:"hdly"}
  	]
});