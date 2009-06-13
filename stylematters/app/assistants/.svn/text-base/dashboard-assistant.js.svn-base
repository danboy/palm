DashboardAssistant = Class.create({
	
	initialize: function(messageText, date, template) {
		this.messageText = messageText;
		this.template = template;
		this.when = date;
		this.count = 1;
		this.reverse = false;
	},

	setup: function() {
		this.updateDisplay();
	},
	
	update: function(messageText, date, template) {
		this.messageText = messageText;
		this.when = date;
		this.template = template;
		this.count += 1;
		this.updateDisplay();
	},
	
	updateDisplay: function() {
		console.log('updating' + this.template);
		var props = {
			title: window.name,
			text: this.messageText, 
			when: this.when, 
			times: this.count == 1 ? $L("time") : $L("times"),
			count: this.count,
			template: this.template
		};
		var messageText = Mojo.View.render({object: props, template: 'dashboard/'+props.template});
		var messageDiv = this.controller.get('dashboard-template-content');
		Element.update(messageDiv, messageText);
		if(this.template == 'dashboard-custom-message'){
			console.log('gpong to anitmate')
			this.doAnimation();
		}
	},
	
	doAnimation:function() {
		var pic = this.controller.get('testPhoto');
		Mojo.Animation.animateStyle(pic, 'left', 'bezier', {
				from:0,
					to: -1180,
					duration: 10,
					curve:'over-easy',
					reverse:this.reverse,
					onComplete: this.doAnimation.bind(this)
					}
		);
		this.reverse = !this.reverse;
	}

});

