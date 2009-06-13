function AppAssistant(appController) {
}
		
AppAssistant.prototype.handleLaunch = function(params) {
	Mojo.Log.info("StyleMatters relaunch with arguments: ", (typeof params), ":", params);

	this.launchNormal(params);
};

AppAssistant.prototype.launchNormal = function(params) {
	// If we're headless, then we need to manually create a card stage.
	if (Mojo.Controller.appInfo.noWindow) {
		this.openWindowWithList();
	} else if(params.banner) {
		// This parameter is set when we're launched due to clicking our notification banner.
		// It causes us to switch to the notify scene.
		this.goToNotifyScene();
	}
};

AppAssistant.prototype.openWindowWithList = function() {
	var f = function(stageController) {
		var sceneCookie, sceneName;
		stageController.pushScene('list');
		sceneName = ListAssistant.getSavedSceneName();
		if (sceneName && false) {
			stageController.pushScene(sceneName);
		}
	};
	this.controller.createStageWithCallback({name: 'list-stage', lightweight: true}, f);
};

AppAssistant.prototype.goToNotifyScene = function() {
	var stageController = Mojo.Controller.stageController;
	stageController.popScenesTo();
	stageController.pushScene('list');
	stageController.pushScene('notify');
	window.focus();	
};

AppAssistant.prototype.considerForNotification = function(notificationData) {
	var c;
	if (notificationData) {
		var template = new Template( $L("red: #{red}, green: #{green}, blue: #{blue}") );
		var values = [];
		["red", "green", "blue"].each(function(color) {
			c = notificationData[color];
			if (c) {
				values.push(color + ": " + c);
			}
		});
		var message = template.evaluate(values);
		this.controller.showBanner(values.join(", "), {});
		var dashboard = this.controller.getStageController("color-dashboard");
		if (dashboard) {
			dashboard.delegateToSceneAssistant("update");
		} else {
			var f = function(stageController) {
				stageController.pushScene('color-dashboard', gColorCounts);
			};
			this.controller.createStageWithCallback("color-dashboard", f, 'dashboard');
		}
	}
};

AppAssistant.prototype.cleanup = function() {
	if(this.considerForNotification) {
		Mojo.log("app cleanup works!");
	} else {
		Mojo.log("meh. unbound.");
	}
};


AppAssistant.prototype.handleSuspendRequest = function(ack, nack) {
	if(this.considerForNotification) {
		Mojo.Log.error("handle suspend works!");
		ack(); 
	} else {
		Mojo.Log.error("meh. unbound suspend request.");
	}
};

AppAssistant.prototype.handleShutdown = function() {
	if(this.considerForNotification) {
		Mojo.Log.error("handle shutdown works!");
		Mojo.Power.ackShutdown(); 
	} else {
		Mojo.Log.error("meh. unbound handle shutdown.");
	}
};

AppAssistant.prototype.handleResume = function() {
	if(this.considerForNotification) {
		Mojo.Log.error("handle resume works!");
	} else {
		Mojo.Log.error("meh. unbound handle resume.");
	}
};

AppAssistant.prototype.prepareForSuspend = function(onComplete) {
	if(this.considerForNotification) {
		Mojo.Log.error("prepare suspend works!");
		onComplete();
	} else {
		Mojo.Log.error("meh. unbound prep for suspend.");
	}
};