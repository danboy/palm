ActivityIndicatorsSmallAssistant = Class.create( ExampleAssistantBase, {
	exampleSpinner1 : 'example-activity-spinner1',
	exampleSpinner2 : 'example-activity-spinner2',
	exampleSpinner3 : 'example-activity-spinner3',
	exampleSpinnerAttrs: {
		spinnerSize: Mojo.Widget.spinnerSmall
	},
	setup : function($super){
		$super();
		this.controller.setupWidget(this.exampleSpinner1, this.exampleSpinnerAttrs, {});
		this.controller.setupWidget(this.exampleSpinner2, this.exampleSpinnerAttrs, {});
		this.controller.setupWidget(this.exampleSpinner3, this.exampleSpinnerAttrs, {});
	},
	ready : function(){
		$(this.exampleSpinner1).mojo.start();
		$(this.exampleSpinner2).mojo.start();
		$(this.exampleSpinner3).mojo.start();
	}
});