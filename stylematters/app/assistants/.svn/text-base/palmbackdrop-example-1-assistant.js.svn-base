PalmbackdropExample1Assistant = Class.create( ExampleAssistantBase, {

  stylesheet: "palmbackdrop-example",

  setup : function($super) {
	$$('body')[0].addClassName('my-dark-backdrop');
	$$('body')[0].addClassName('palm-dark');
	$$('body')[0].removeClassName('palm-default');
	$super();
  },

  deactivate : function($super) {
	$$('body')[0].addClassName('palm-default');
	$$('body')[0].removeClassName('palm-dark');
	$$('body')[0].removeClassName('my-dark-backdrop');
	$super();
  }

});
