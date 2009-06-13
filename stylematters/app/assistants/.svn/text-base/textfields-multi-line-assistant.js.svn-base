TextfieldsMultiLineAssistant = Class.create( ExampleAssistantBase, {
	setup: function($super) {
		$super();
		this.attributes = {
			hintText: $L('Enter text...'),
			modelProperty: 'original',
			multiline: true,
			label: $L('To:'),
			focus: true,
			textFieldMode: 'sentence-case',
			limitResize: false,
			enterSubmits: false,
			holdToEnable:true
		};
		this.model = {
			'original' : $L('This is a \rmulti-line \rtextfield, \ryo'),
			disabled: false
		};
		this.controller.setupWidget('textField', this.attributes, this.model);
	}
});