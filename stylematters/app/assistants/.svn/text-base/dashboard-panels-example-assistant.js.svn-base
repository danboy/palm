DashboardPanelsExampleAssistant = Class.create( ExampleAssistantBase, {
	setup : function($super){
		$super();

		this.message = $L('Style Matters');

		this.controller.listen('dashboard-message', Mojo.Event.tap, this.notify.bindAsEventListener(this));
		this.controller.listen('dashboard-custom-message', Mojo.Event.tap, this.notify.bindAsEventListener(this));
	},
	
	notify: function(event) {
		var target = this.controller.get(event.target).up('div.palm-button').getAttribute('id');
		console.log(target);
		var appController = Mojo.Controller.getAppController();
		this.controller.commitChanges();
		var bannerParams = {
			soundClass: '', 
			soundFile: '', 
			icon: '',
			messageText: this.message
		}
		appController.showBanner(bannerParams, {banner: this.message});
		var stageController = Mojo.Controller.getAppController().getStageController(this.kDashboardStageName);
		if (stageController) {
			stageController.delegateToSceneAssistant("update", this.message, new Date(), target);
		} else {
			this.notificationCreatedHandler = this.notificationCreated.bind(this, this.message, target);
			Mojo.Controller.getAppController().createStageWithCallback({name: this.kDashboardStageName, lightweight: true},
				this.notificationCreatedHandler, "dashboard");
		}
	},
	
	notificationCreated: function(text, template, stageController) {
		stageController.pushScene('dashboard', text, new Date(), template);
	},

	closeNotifications: function(event) {
		Mojo.Controller.getAppController().removeAllBanners();
		Mojo.Controller.getAppController().closeStage(this.kDashboardStageName);
	},
	
	kDashboardStageName: "stylematters-dashboard"
});