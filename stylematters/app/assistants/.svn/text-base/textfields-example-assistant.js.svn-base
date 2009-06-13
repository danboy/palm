TextfieldsExampleAssistant = Class.create( ExampleAssistantBase, {
	setup: function($super) {
		$super();
		this.attributes = {
			modelProperty: 'original',
			multiline: false,
			label: $L('To:'),
			focus: true,
			textFieldMode: 'sentence-case',
			limitResize: false,
			enterSubmits: false,
			holdToEnable:true
		};
		this.model = {
			'original' : $L('text'),
			disabled: false
		};
		this.controller.setupWidget('textField', this.attributes, this.model);
	}
});