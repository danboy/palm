function AddAssistant(arg){
	this.demoDepot = arg;
}

AddAssistant.prototype.setup = function() {
	
	//Create the attributes for the textfield
	this.keyFieldAtt = {
			hintText: 'Enter key here',
			textFieldName:	'mykeyField', 
			modelProperty:		'originalValue', 
			multiline:		false,
			disabledProperty: 'disabled',
			focus: 			true, 
			modifierState: 	Mojo.Widget.capsLock,
			limitResize: 	false, 
			holdToEnable:  false, 
			focusMode:		Mojo.Widget.focusSelectMode,
			changeOnKeyPress: true,
			textReplacement: false,
			maxLength: 30,
			requiresEnterKey: false
	};
	//Create the model for the text field
	this.keyModel = {
		originalValue : ''
	};
	
	this.numberFieldAtt = {
			hintText: 'Enter some numeric data',
			textFieldName:	'mynumberField', 
			modelProperty:		'originalValue', 
			multiline:		false,
			disabledProperty: 'disabled',
			focus: 			false, 
			modifierState: 	Mojo.Widget.numLock,
			limitResize: 	false, 
			holdToEnable:  false, 
			focusMode:		Mojo.Widget.focusSelectMode,
			changeOnKeyPress: true,
			textReplacement: false,
			maxLength: 30,
			requiresEnterKey: false
	};
	this.numberModel = { 
		originalValue : ''
	};
	
	this.textFieldAtt = {
		hintText: 'and some text here',
		textFieldName:	'mytextField', 
		modelProperty:		'originalValue', 
		multiline:		false,
		charsAllow:		'Mojo.Widget.TextField.numericFilter', 
		disabledProperty: 'disabled',
		focus: 			false, 
		modifierState: 	Mojo.Widget.capsLock,
		limitResize: 	false, 
		holdToEnable:  false, 
		focusMode:		Mojo.Widget.focusSelectMode,
		changeOnKeyPress: true,
		textReplacement: false,
		maxLength: 30,
		requiresEnterKey: false
	};
	this.textModel = {
		originalValue : ''
	};
	
	//Setup the textfield widget and observer
	
	this.controller.setupWidget('keyField', this.keyFieldAtt, this.keyModel);
	this.controller.setupWidget('numberField', this.numberFieldAtt, this.numberModel);
	this.controller.setupWidget('textField', this.textFieldAtt, this.textModel);
	
	Mojo.Event.listen(this.controller.get('add_button'),Mojo.Event.tap, this.add.bind(this));
	Mojo.Event.listen(this.controller.get('back_button'), Mojo.Event.tap, this.back.bind(this));
	
	this.depotResult = this.controller.get("depotResult");
}

AddAssistant.prototype.add = function(){
	//TODO: respond to model change event and save silently
	console.log(this.keyModel.originalValue + " : " + this.numberModel.originalValue + " : " + this.textModel.originalValue);
	
	//To update an existing entry, call add() again with the key of the entry you want to update.
	this.data = {"arg1": this.numberModel.originalValue, "arg2":this.textModel.originalValue};

	//TODO: warn users before replacing a record
	//this.demoDepot.simpleGet (demoKey, this.getSuccess, this.dbFailure)
	this.demoDepot.simpleAdd(this.keyModel.originalValue, this.data, this.dbSuccess, this.dbFailure)
	
}

AddAssistant.prototype.back = function(){
	Mojo.Controller.stageController.popScene();
}

AddAssistant.prototype.getSuccess = function() {
	alert("You are about to replace an existing record. Confirm!");
	this.demoDepot.simpleAdd(demoKey, this.data, this.dbSuccess, this.dbFailure);
}

AddAssistant.prototype.dbSuccess = function() {
	console.log("***** depot operation success!");
	this.depotResult.innerHTML = ("Add success!");
}

AddAssistant.prototype.dbFailure = function(transaction, result) {
	console.log("***** depot failure: " + result.message);
	this.depotResult.innerHTML = ("Add failure!");
}
/*
 * Utility method
 */
AddAssistant.prototype.setResult = function(message) {
		this.depotResult.innerHTML = message;
		this.delayedClearResult();
}

/*
 * Utility method
 */
AddAssistant.prototype.delayedClearResult = function(message) {
		if(this.timeout) {
			this.controller.window.clearTimeout(this.timeout);
			this.timeout = null;
		}
		this.timeout = this.controller.window.setTimeout(
			function() {
				this.depotResult.innerHTML = "";
				this.timeout = null;
			}.bind(this), 2000);
}

/*
 * Utility method
 */
AddAssistant.prototype.clearResult = function(message) {
			if(this.timeout) {
				this.controller.window.clearTimeout(this.timeout);
				this.timeout = null;
			}
			this.depotResult.innerHTML = "";
}

