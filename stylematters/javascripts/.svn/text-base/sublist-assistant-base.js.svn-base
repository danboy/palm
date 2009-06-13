SublistAssistantBase = Class.create( OrientationHandlerAssistant, {
	
	title : "",
    description : "",
	initialize : function(title, description) {
		this.title = title;
		this.description = description;
	},
	
    setup : function() {
		//set the title and description
		$('e_title').innerHTML = this.title;
		$('e_description').innerHTML = this.description;
		
		var sceneName;
		this.examplesModel = {listTitle: $L('Examples'), items:this.kExamples};
		this.controller.setupWidget('examples', 
									{
										itemTemplate: 'example',
										dividerTemplate: 'divider',
										dividerFunction: this.exampleCategory,
										filterFunction: this.filterExamples.bind(this),
										renderLimit: 80
									},
									this.examplesModel);
		this.controller.listen('examples', Mojo.Event.listTap, this.handleListTap.bindAsEventListener(this));
    },

	convertSceneName: function(sceneId) {
		return sceneId.gsub("_", "-");
	},
	
	activate: function($super) {
		$super();
		SublistAssistantBase.setSavedSceneName("");
	},
	
	deactivate : function(){
		
	},
	
	filterExamples: function(filterString, listWidget, offset, count) {
		var matching, lowerFilter;
		if (filterString) {
			lowerFilter = filterString.toLocaleLowerCase();
			function matchesName (example) {
				return example.title.toLocaleLowerCase().startsWith(lowerFilter);
			}
			matching = this.kExamples.findAll(matchesName)
		} else {
			matching = this.kExamples;
		}
		this.examplesModel.items = matching;			
		listWidget.mojo.setLength(matching.length);
		listWidget.mojo.setCount(matching.length);
		listWidget.mojo.noticeUpdatedItems(0, matching);
	},

	listElementSelector: 'div[id^="line_"]',

	handleListTap: function(listTapEvent) {
		var example = listTapEvent.item;
		var sceneName = this.convertSceneName(example.name);
		var title = example.title;
		var description = example.description;
		console.log(title + " " + description);
		if (sceneName === 'test') {
			Mojo.Test.pushTestScene(this.controller.stageController);
		} else {
			if(listTapEvent.originalEvent.down.shiftKey) {
				this.showSceneHandler = this.showScene.bind(this, sceneName);
				Mojo.Controller.getAppController().createStageWithCallback({name: sceneName, lightweight: true}, this.showSceneHandler);
			} else {
				SublistAssistantBase.showScene(sceneName, this.controller.stageController, title, description);
			}
		}				
		listTapEvent.stop();
	},
	
	exampleCategory : function(modelItem) {
		return modelItem.category;
	}
	
});

//getting and setting the scene cookie
SublistAssistantBase.kSceneCookieName = "subSceneCookie";

SublistAssistantBase.getSavedSceneName = function() {
	var sceneCookie = new Mojo.Model.Cookie(this.kSceneCookieName);
	return sceneCookie.get();
};

SublistAssistantBase.setSavedSceneName = function(sceneName) {
	var sceneCookie = new Mojo.Model.Cookie(this.kSceneCookieName);
	sceneCookie.put(sceneName);
};

SublistAssistantBase.showScene = function(sceneName, stageController, title, description, parentSceneName) {
	if(title == null && description == null && parentSceneName){
		var assistantName = Mojo.identifierToCreatorFunctionName(parentSceneName, "Assistant");
		var constructorFunction = window[assistantName];
		for(var i=0;i<constructorFunction.prototype.kExamples.length;i++){
			if(constructorFunction.prototype.kExamples[i].name == sceneName){
				title = constructorFunction.prototype.kExamples[i].title;
				description = constructorFunction.prototype.kExamples[i].description;
				break;
			}
		}
	}
	stageController.pushScene({name: sceneName},$L(title), $L(description));
	this.setSavedSceneName(sceneName);			
};