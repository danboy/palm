function AdvancedAssistant(arg){
	this.demoDepot = arg;
	
	this.listTestWordList = [
		{data:$L("Scintillating"), definition:$L("Marked by high spirits or excitement.")},
		{data:$L("Serendipity"), definition: $L("The faculty of making fortunate discoveries by accident.")},
		{data:$L("Hullabaloo"), definition:$L("A great noise or commotion; a hubbub.")},
		{data:$L("Chortle"), definition:$L("A snorting, joyful laugh or chuckle.")},
		{data:$L("Euphonious"), definition:$L("Pleasant sounding.")}
		];
		
	this.noItems = [];

}

AdvancedAssistant.prototype.setup = function(){
		// Set up view menu with scene header
		//this.controller.setupWidget(Luna.viewMenu, undefined, {items: [{label: $L("Widgets &raquo; Editable List")}, {}]});
		this.bucketAtt = {
			hintText: 'Bucket',
			textFieldName:	'bucketTextfield', 
			modelProperty:		'originalValue', 
			multiline:		false,
			disabledProperty: 'disabled',
			focus: 			false, 
			modifierState: 	Mojo.Widget.capslock,
			limitResize: 	false, 
			holdToEnable:  false, 
			focusMode:		Mojo.Widget.focusSelectMode,
			changeOnKeyPress: true,
			textReplacement: false,
			maxLength: 30,
			requiresEnterKey: false
	};
	this.bucketModel = { 
		originalValue : ''
	};
	
	this.keyAtt = {
		hintText: 'Key',
		textFieldName:	'mytextField', 
		modelProperty:		'originalValue', 
		multiline:		false,
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
	this.keyModel = {
		originalValue : ''
	};
	
	//Setup the textfield widget and observer
	
	this.controller.setupWidget('bucketTextfield', this.bucketAtt, this.bucketModel);
	this.controller.setupWidget('keyTextfield', this.keyAtt, this.keyModel);
		// Set up a few models so we can test setting the widget model:
		this.wordsModel = {listTitle:$L('Words'), items:this.listTestWordList};    
		this.noItemsModel = {listTitle:$L('Initially Empty'), items:this.noItems};
		this.currentModel = this.wordsModel;
		
		this.depotResult = this.controller.get("depotResult");

		// Set up the attributes & model for the List widget:
		this.controller.setupWidget('wordsList', 
		{itemTemplate:'storage/depot/listitem', listTemplate:'storage/depot/listcontainer', 
		addItemLabel:$L("Add..."), swipeToDelete:true, reorderable:true},
		this.wordsModel);

		// Watch relevant list events:
		this.wordsList = this.controller.get('wordsList');
		Mojo.listen(this.wordsList, Mojo.Event.listChange, this.listChangeHandler.bindAsEventListener(this));
		// Add a new item to the list
		Mojo.listen(this.wordsList, Mojo.Event.listAdd, this.listAddHandler.bindAsEventListener(this));
		// Delete an item
		Mojo.listen(this.wordsList, Mojo.Event.listDelete, this.listDeleteHandler.bindAsEventListener(this));
		// Reorder the list
		Mojo.listen(this.wordsList, Mojo.Event.listReorder, this.listReorderHandler.bindAsEventListener(this));

		// We are gonna use the depot passed into this scene, instead of creating a new one
		//this.setupDb();

		// Save items into depot
		this.controller.listen('saveButton', Mojo.Event.tap, this.save.bindAsEventListener(this));
		// Restore saved items
		this.controller.listen('restoreButton', Mojo.Event.tap, this.restore.bindAsEventListener(this));
		// Remove saved items
		this.controller.listen('removeButton', Mojo.Event.tap, this.remove.bindAsEventListener(this));
		Mojo.Event.listen(this.controller.get('back_button'),Mojo.Event.tap, this.back.bindAsEventListener(this));

}


AdvancedAssistant.prototype.save = function(event) {
		this.clearResult();

		var bucket = this.bucketModel.originalValue; //this.controller.get("bucketTextfield").value;
		var key = this.keyModel.originalValue; //this.controller.get("keyTextfield").value;
		var value = this.currentModel;
		var onSuccess = this.setResult.bind(this, "Save succeeded.");
		var onFailure = this.setResult;


		//filters are null in this example. they can be used to tag sets of objects 
		//and are used when fetching multiple.
		this.demoDepot.addSingle(bucket, key, value, null, onSuccess, onFailure);
		console.log("****** saved " + Object.toJSON(value));

}

AdvancedAssistant.prototype.restore = function(event) {
		this.clearResult();

		var bucket = this.bucketModel.originalValue; //this.controller.get("bucketTextfield").value;
		var key = this.keyModel.originalValue;
		console.log("getting bucket: " + bucket + " key: " + key);
		var onSuccess = function(rs) {
			if (rs === null) {
				this.setResult("No such record in the database.");
				this.currentModel = {listTitle:$L('Null'), items:[]};
			} else {
				this.setResult("Restore succeeded.");
				console.log("****** got " + Object.toJSON(rs));
				this.currentModel = rs;
			}
			this.controller.setWidgetModel(this.wordsList, this.currentModel);

		}.bind(this);
		var onFailure = this.setResult;

		this.demoDepot.getSingle(bucket, key, onSuccess, onFailure);
}

// removeSingle: function(bucket, key, onSuccess, onFailure)
AdvancedAssistant.prototype.remove = function(event){
		this.clearResult();

		var bucket = this.bucketModel.originalValue; 
		var key = this.keyModel.originalValue;
		var onSuccess = function(rs) {
			this.setResult("Remove succeeded.");
			this.currentModel = {listTitle:$L('Null'), items:[]};
			this.controller.setWidgetModel(this.wordsList, this.currentModel);
		}.bind(this); 
		
		var onFailure = this.setResult;
		console.log("removing bucket: " + bucket + " key: " + key);
		
		this.demoDepot.removeSingle(bucket, key, onSuccess, onFailure);
}

// Called for Mojo.Event.listAdd events.
// Adds a new item to the list.
AdvancedAssistant.prototype.listAddHandler = function(event) {
		/* This works, but refreshes the whole list:
		this.currentModel.items.push({data:"New item"});
		this.controller.modelChanged(this.currentModel, this);*/

		// The 'addItems' API will inserts the item where indicated, 
		// and then the list can potentially update only the added item.
		var newItem = {data:$L("New item")};
		this.currentModel.items.push(newItem);
		this.wordsList.palm.addItems(this.currentModel.items.length, [newItem]);
}

// Called for Mojo.Event.listDelete events.
// Removes the deleted item from the model (and would persist the changes to disk if appropriate).
// The list's DOM elements will be updated automatically, unless event.preventDefault() is called.
AdvancedAssistant.prototype.listDeleteHandler = function(event) {
		Mojo.log("EditablelistAssistant deleting '"+event.item.data+"'.");
		this.currentModel.items.splice(this.currentModel.items.indexOf(event.item), 1);
}

// Called for Mojo.Event.listReorder events.
// Modifies the list item model to reflect the changes.
AdvancedAssistant.prototype.listReorderHandler = function(event) {
		this.currentModel.items.splice(this.currentModel.items.indexOf(event.item), 1);
		this.currentModel.items.splice(event.toIndex, 0, event.item);
}


// Called for Mojo.Event.listChange events, which are sent when a 'change' event comes from a list item.
// Saves the new value into the model.
AdvancedAssistant.prototype.listChangeHandler = function(event) {
		if(event.originalEvent.target.tagName == "INPUT") {
			event.item.data = event.originalEvent.target.value;
			console.log("Change called.  Word is now: "+event.item.data);
		}
}


AdvancedAssistant.prototype.back = function(){
	Mojo.Controller.stageController.popScene();
}

/*
 * Utility method
 */
AdvancedAssistant.prototype.setResult = function(message) {
		this.depotResult.innerHTML = message;
		//this.depot._dumpTables();
		this.delayedClearResult();
}

/*
 * Utility method
 */
AdvancedAssistant.prototype.delayedClearResult = function(message) {
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
AdvancedAssistant.prototype.clearResult = function(message) {
			if(this.timeout) {
				this.controller.window.clearTimeout(this.timeout);
				this.timeout = null;
			}
			this.depotResult.innerHTML = "";

}
