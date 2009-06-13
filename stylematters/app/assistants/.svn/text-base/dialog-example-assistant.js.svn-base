DialogExampleAssistant = Class.create( ExampleAssistantBase, {
	setup : function($super){
		$super();
		this.controller.get('default_button').observe(Mojo.Event.tap, this.doAlertDefault.bindAsEventListener(this));
		this.controller.get('two_button').observe(Mojo.Event.tap, this.doAlert.bindAsEventListener(this));
		this.controller.get('error_button').observe(Mojo.Event.tap, this.doError.bindAsEventListener(this));
		this.controller.get('date_picker_button').observe(Mojo.Event.tap, this.doDatePickerDialog.bindAsEventListener(this));
		this.controller.get('username_password_button').observe(Mojo.Event.tap, this.doUsernamePasswordDialog.bindAsEventListener(this));
		this.controller.get('all_buttons').observe(Mojo.Event.tap, this.doAllButtonsDialog.bindAsEventListener(this));
		this.pickerModel = {time:new Date(), myValue:42};
		this.controller.setupWidget('timepicker', {minuteInterval:15, modelProperty:'time'}, this.pickerModel);
		this.controller.setupWidget('username', this.usernameAttributes, "");
		this.controller.setupWidget('password', this.passwordAttributes, "");
	},
	doUsernamePasswordDialog: function(e) {
		this.controller.showDialog({
			template: 'dialogs/username-password-dialog',
			assistant: new SampleDialogAssistant(this)
		});
		
	},
	doAllButtonsDialog: function(e) {
		this.controller.showDialog({
			template: 'dialogs/all-buttons-dialog',
			assistant: new SampleDialogAssistant(this)
		});
		
	},
	doDatePickerDialog: function(e) {
		this.controller.showDialog({
			template: 'dialogs/datepicker-dialog',
			assistant: new SampleDialogAssistant(this)
		});
		
	},
	doAlert: function() {
	  this.controller.showAlertDialog({
	    title: $L("Two Buttons"),
	    message: $L("Choose one of the following options"),
	    choices:[
        {label:$L('Option 1')},  
        {label:$L("Option 2")},   
	    ]
	  });
	},
	doAlertDefault: function() {
	  this.controller.showAlertDialog({
	    title: $L("One Button"),
	    message: $L("A message"),
		choices:[{label:$L('A Button')}]
	  });
	},
	doError: function(event) {
			Mojo.Controller.errorDialog($L("Acknowledge this error."));
	},
	usernameAttributes: {
		textReplacement: false,
		maxLength: 64,
		focus: true,
		acceptBack: true,
		hintText: 'enter network name',
		changeOnKeyPress: true,
	},
	passwordAttributes: {
		textReplacement: false,
		maxLength: 64,
		focus: false,
		acceptBack: true,
		hintText: 'enter password',
		changeOnKeyPress: true,
	},
	
});

/*
	Small controller class used for the dialog sample.
*/
var SampleDialogAssistant = Class.create({
	
	initialize: function(sceneAssistant) {
		this.sceneAssistant = sceneAssistant;
		this.controller = sceneAssistant.controller;
	},
	
	setup : function(widget) {
		this.widget = widget;
		this.controller.get('thanksButton').addEventListener(Mojo.Event.tap, this.handleThanks.bindAsEventListener(this));
		this.controller.get('cancel_button').addEventListener(Mojo.Event.tap, this.handleThanks.bindAsEventListener(this));
	},
	
	handleThanks: function() {
		this.widget.mojo.close();
	}
	
	
});
