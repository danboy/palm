AddressingWidgetExampleAssistant = Class.create( ExampleAssistantBase, {
	 setup: function($super) {
		$super();
	  	//create a mojo combo box widget
		this.controller.pushCommander(this);
		this.recipients = [  {
			'id': '1',
			'value': 'mindy@palm.com',
			'serviceName': 'AIM',
			'personId': '12345',
			'contactDisplay': 'Mindy Pereira',
			'type': 'IM'
			}, {
	  		'id': '2',
	  		'value': 'ed@palm.com',
	  		'serviceName': '',
	  		'personId': '6789',
	  		'contactDisplay': 'Ed Ballot',
	  		'type': 'email'
	  		},
			, {
	  		'id': '3',
	  		'value': 'ed@palm.com',
	  		'serviceName': '',
	  		'personId': '6789',
	  		'contactDisplay': 'Adrian',
	  		'type': 'email'
	  		}
			, {
	  		'id': '4',
	  		'value': 'ed@palm.com',
	  		'serviceName': '',
	  		'personId': '6789',
	  		'contactDisplay': 'Amit',
	  		'type': 'email'
	  		}
			, {
	  		'id': '5',
	  		'value': 'ed@palm.com',
	  		'serviceName': '',
	  		'personId': '6789',
	  		'contactDisplay': 'Bayard',
	  		'type': 'email'
	  		}
			, {
	  		'id': '6',
	  		'value': 'ed@palm.com',
	  		'serviceName': '',
	  		'personId': '6789',
	  		'contactDisplay': 'Airport Cab',
	  		'type': 'email'
	  		}
			, {
	  		'id': '7',
	  		'value': 'ed@palm.com',
	  		'serviceName': '',
	  		'personId': '6789',
	  		'contactDisplay': 'Daniel',
	  		'type': 'email'
	  		}
			, {
	  		'id': '8',
	  		'value': 'ed@palm.com',
	  		'serviceName': '',
	  		'personId': '6789',
	  		'contactDisplay': 'Adil',
	  		'type': 'email'
	  		}
			, {
	  		'id': '9',
	  		'value': 'ed@palm.com',
	  		'serviceName': '',
	  		'personId': '6789',
	  		'contactDisplay': 'Rob',
	  		'type': 'email'
	  		}
			, {
	  		'id': '10',
	  		'value': 'ed@palm.com',
	  		'serviceName': '',
	  		'personId': '6789',
	  		'contactDisplay': 'Jesse Donaldson',
	  		'type': 'email'
	  		}];

		this.searchList = {
			"property" : 'to$A',	
			"includeEmails": true,
	  		"hintText": $L("type name or address..."),
	  		"labelText": $L("To:"),
	  		"nextFocus": 'nextFocusable',
	  		focus: true,
			actionableLabel: true,
			determineTypeFunction: this.determine.bind(this),
	  		//"recipients": this.recipients,
			closeOnBack: true,
			showGAL: true
		};

		this.controller.setupWidget('searchList', null, this.searchList);
		this.searchList = this.controller.get('searchList');

	  },
	 determine: function(value) {
		if (this.validatePhonenumber(value)) {
			return "PHONE";
		} else {
			return "EMAIL";
		}
	  },
});