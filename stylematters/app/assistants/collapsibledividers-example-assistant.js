CollapsibledividersExampleAssistant = Class.create( ExampleAssistantBase, {
	setup : function($super){
		$super();
		this.examplesModel = {listTitle: $L('Examples'), items:this.kExamples};
		this.controller.setupWidget('examples',
									{
										dividerTemplate: 'collapsibledividers-example/divider',
										dividerFunction: this.exampleCategory,
										itemTemplate: 'collapsibledividers-example/entry'
									},
									this.examplesModel);
	},
	exampleCategory : function(modelItem) {
		return modelItem.category;
	},
	activate : function($super){
		$super();
		this.kExamples.each(this.moveElementsIntoDividers.bind(this));
		this.kExamples.each(this.attachHandler.bind(this));
	},
	attachHandler : function(item, index){
		//attach a compressor handler to each collapsable divider
		var compress = this.controller.get('compress'+item.category);
		var compressable = this.controller.get('compressable'+item.category).hide();
		if(!compress.hasClassName('compressor')){
			compress.addClassName('compressor')
			this.controller.listen(compress, Mojo.Event.tap, this.handleDrawerSelection.bind(this, compressable));
		}	
	},
	moveElementsIntoDividers : function(item, index){
		//mv elements into their appropriate collapsable dividers element#{id}
		var compressable = this.controller.get('compressable'+item.category).hide();
		compressable.insert(this.controller.get('element'+item.id));
		this.controller.get('element'+item.id).show();
	},
	kExamples : [{
		"id": 1,
	    "category": "Three",                                                       
		"title": "Example",
		"description": "An example",
		"hiddenIfo":randomLorem()
	    },
	  	{
		"id": 2,
	    "category": "Three",                                                       
		"title": "Example",
		"description": "An example",
		"hiddenIfo":randomLorem()
	    },
	  	{
		"id": 3,
	    "category": "Example",                                                       
		"title": "Example",
		"description": "An example",
		"hiddenIfo":randomLorem() 
	    },
	  	{
		"id": 4,
	    "category": "Example",                                                       
		"title": "Example",
		"description": "An example",
		"hiddenIfo":randomLorem()  
	    },
	  	{
		"id": 5,
	    "category": "Dividers",                                                       
		"title": "Example",
		"description": "An example",
		"hiddenIfo":randomLorem()  
	    },
	  	{
		"id": 6,
	    "category": "Dividers",                                                       
		"title": "Example",
		"description": "An example",
		"hiddenIfo":randomLorem()  
	    },
	  	{
		"id": 7,
	    "category": "Dividers",                                                       
		"title": "Example",
		"description": "An example",
		"hiddenIfo":randomLorem()  
	    },
	  	{
		"id": 8,
	    "category": "Dividers",                                                       
		"title": "Example",
		"description": "An example",
		"hiddenIfo":randomLorem()  
	    },
	  	{
		"id": 9,
	    "category": "Dividers",                                                       
		"title": "Example",
		"description": "An example",
		"hiddenIfo":randomLorem()  
	    },
	  	{
		"id": 10,
	    "category": "Dividers",                                                       
		"title": "Example",
		"description": "An example",
		"hiddenIfo":randomLorem()  
	    },
	  	{
		"id": 11,
	    "category": "Dividers",                                                       
		"title": "Example",
		"description": "An example",
		"hiddenIfo":randomLorem()  
	    },
	  	{
		"id": 12,
	    "category": "Dividers",                                                       
		"title": "Example",
		"description": "An example",
		"hiddenIfo":randomLorem()  
	    }
	]

});
