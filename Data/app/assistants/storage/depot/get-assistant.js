function GetAssistant(arg){
	this.demoDepot = arg;
}

GetAssistant.prototype.setup = function(){
	this.keyAtt = {
			hintText: 'Enter key here',
			textFieldName:	'mytextField', 
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
		this.keyModel = {
			originalValue : ''
		};
		
		//Setup the textfield widget and observer
		
		this.controller.setupWidget('entryNum', this.keyAtt, this.keyModel);
	Mojo.Event.listen(this.controller.get('get_button'),Mojo.Event.tap, this.get.bindAsEventListener(this));
	Mojo.Event.listen(this.controller.get('back_button'),Mojo.Event.tap, this.back.bindAsEventListener(this));
}

GetAssistant.prototype.get = function(){
	
	this.demoDepot.simpleGet(this.keyModel.originalValue, this.dbGetSuccess, this.dbFailure);
}

GetAssistant.prototype.back = function(){
	Mojo.Controller.stageController.popScene();
}

GetAssistant.prototype.dbGetSuccess = function(response){
	
	var recordSize = Object.values(response).size();
	if(recordSize == 0) {
		$('response').update("No such record in the database");
	} else {
		$('response').update("Data entry is: " + response.arg1 + " : " + response.arg2);
	}
}

GetAssistant.prototype.dbFailure = function(transaction, result) {
	console.log("***** depot failure: " + result.message);
}