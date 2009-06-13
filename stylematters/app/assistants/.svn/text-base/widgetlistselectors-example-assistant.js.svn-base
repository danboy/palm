WidgetlistselectorsExampleAssistant = Class.create( ExampleAssistantBase, {
	statuses: [               
		{label:$L('Away'), value:"away", secondaryIcon:'status-away'},
		{label:$L('Available'), value:"available" , secondaryIcon:'status-available', disabled:true}, 
		{label:$L('Offline'), value:"offline", secondaryIcon:'status-offline'} ],
  	testChoices: 	[	
        {label:$L('Message')},
		{label:$L('Send Message to...'), value:"Send Message to...", disabled:true },                                                                                        
		{label:$L('PHONE')},  
		{label:$L('510-321-3123 (m)'), value:"510-321-3123 (m)'), value" , disabled:true},
		{label:$L('AIM')},  
		{label:$L('Angie.Sparks'), value:"AIM - Angie.Sparks", secondaryIcon:'status-available' },   
		{label:$L('GTALK - jkodama')},
		{label:$L('Angie.Sparks'), value:"GTALK - Angie.Sparks", secondaryIcon:'status-available' },
		{label:$L('GTALK - justing')},  
		{label:$L('Sparks McGee'), value:"GTALK - Sparks McGee", secondaryIcon:'status-available' },
		{label:$L('GOOGLE')},  
		{label:$L('jokodama@gmail.com'), value:"jokodama@gmail.com", icon:'gtalk' },   
		{label:$L('PERSONAL')},  
		{label:$L('justin@kodama.com'), value:"justin@kodama.com", icon:'exchange' },
		{label:$L('PALM')},  
		{label:$L('justin.kodama@palm.com'), value:"justin.kodama@palm.com", icon:'palm' }],
	transports:  [
				{label:$L('Transport')},
				{label:'m1ghtyat0m', value:"gtalk", secondaryIcon:'status-offline', icon:'gtalk'},
				{label:'matiasd74', value:"aim", secondaryIcon:'status-available', icon:'aim'}
	],
	selectorsModel: {currentStatus: 'away', currentTransport: "gtalk", currentWork: "assiduous", currentTest:'sun-cmd'},
  setup : function($super) {
	$super();
	this.controller.setupWidget('laughSelector', {label: $L('Status'), choices: this.statuses, modelProperty:'currentStatus'}, this.selectorsModel);
	this.controller.setupWidget('commotionSelector', {label: $L('Transport'), choices: this.transports, modelProperty:'currentTransport'}, this.selectorsModel);
	this.controller.setupWidget('testSelector', {label: $L('Test'), choices: this.testChoices, modelProperty:'currentTest'}, this.selectorsModel);
  },
  selectorChanged: function(event) {
	
  }
});
