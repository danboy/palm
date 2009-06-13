var BackupAssistant = {};
BackupAssistant.attr = {	content: content,
							title: 'title',
							modelProperty: 'progress',
						};

BackupAssistant.model = {icon: "action-icon",title: 'title',cancellable: true};
var content = Mojo.View.render({template: 'file-download-progress-example/entry'});

FileDownloadProgressExampleAssistant = Class.create( ExampleAssistantBase, {
	setup: function($super) {
		$super();
		this.controller.setupWidget('progressPill', BackupAssistant.attr, BackupAssistant.model);
		this.controller.listen('progressPill', Mojo.Event.tap,this.startProgress.bind(this, 0));
		this.controller.listen('progressPill', Mojo.Event.progressComplete,this.complete.bind(this));
	},
	
	complete: function() {

			BackupAssistant.model.progress = undefined;
			this.controller.modelChanged(BackupAssistant.model);
	},

	
	reset: function() {
	/*	this.controller.get('progressPill').mojo.reset();
		this.stopProgress();
		this.startProgress(0);*/
		this.controller.get('progressPill').show();
		this.controller.showWidgetContainer(this.controller.get('progressPill'));
		this.startProgress(0);
	},
	
	stopProgress: function() {
		if (this.updater) {
			this.stopped = true;
			this.controller.window.clearInterval(this.updater);
			delete this.updater;	
		}		
	},

	startProgress: function(inProgress) {
		this.stopped = undefined;
		if (!this.updater) {
			this.updater = this.controller.window.setInterval(this.updateProgress.bind(this), 600);
		}
		if (inProgress !== undefined) {
			this.progress = inProgress;
		}		
	},

	updateProgress: function() {
		if (this.stopped) {
			return;
		}
		if (this.progress > 1) {
			this.progress = 1;
			console.log("SET TO 1");
			BackupAssistant.model.progress = this.progress;
			this.controller.modelChanged(BackupAssistant.model);
			this.stopProgress();
			return;
		}
		BackupAssistant.model.progress = this.progress;
		this.controller.modelChanged(BackupAssistant.model);
		this.progress += .2;
	//	console.log("progress" + this.progress);
		
	},
	
	cleanup: function() {
		this.stopProgress();
	}
});