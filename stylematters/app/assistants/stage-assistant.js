function StageAssistant(stageController) {
	if (!Mojo.Controller.appInfo.noWindow && !Mojo.Controller.isChildWindow(stageController.window)) {
		var appController = stageController.getAppController();
		var sceneName = "list";
		stageController.pushScene({name: sceneName, id: 'list'});
		sceneName = ListAssistant.getSavedSceneName();
		subSceneName = SublistAssistantBase.getSavedSceneName();
		if (sceneName) {
			ListAssistant.showScene(sceneName, stageController);
		}
		if(subSceneName){
			SublistAssistantBase.showScene(subSceneName, stageController, null, null, sceneName);
		}
	}
}

StageAssistant.prototype.setup = function() {
	Mojo.log("framework-library " + this.controller.window.name + " stage setup.");
};

StageAssistant.prototype.cleanup = function() {
	Mojo.log("framework-library " + this.controller.window.name + " stage closed.");
};




