FormErrorsAssistant = Class.create( ExampleAssistantBase, {

	showErrorDialog: function() {
		focusElement = this.controller.get('wizard-email-address');
		this.controller.showAlertDialog({
			onChoose: function() {focusElement.mojo.focus();},
			title: $L("Error"),
			message: $L('Invalid Password'),
			choices: [{label:$L('Done'), value:'dismiss', type:'alert'}]
		});
	}
});