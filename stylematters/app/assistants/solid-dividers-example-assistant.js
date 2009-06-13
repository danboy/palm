SolidDividersExampleAssistant = Class.create( ExampleAssistantBase, {
	setup : function($super){
		$super();
		this.examplesModel = {listTitle: $L('Examples'), items:this.kExamples};
		this.controller.setupWidget('examples',
									{
										itemTemplate: 'solid-dividers-example/entry',
										dividerTemplate: 'solid-dividers-example/divider',
										dividerFunction: this.getDivider
									},
									this.examplesModel);
		},
		getDivider: function(item){
			if (!item.exclude) {
				return item.category;
			}
		},
		kExamples : [
		//scene basics
	  	{
	    "category": "A",                                                       
		"title": "Example 1",
		"description": "An example"
	    },
	  	{
	    "category": "A",                                                       
		"title": "Example 2",
		"description": "An example"  
	    },
	  	{
	    "category": " B",                                                       
		"title": "Example 3",
		"description": "An example"  
	    },
	  	{
	    "category": "B",                                                       
		"title": "Example 4",
		"description": "An example"  
	    },
	  	{
	    "category": "C",                                                       
		"title": "Example 5",
		"description": "An example"  
	    },
	  	{
	    "category": "C",                                                       
		"title": "Example 6",
		"description": "An example"  
	    },
	  	{
	    "category": "C",                                                       
		"title": "Example 7",
		"description": "An example"  
	    },
	  	{
	    "category": "D",                                                       
		"title": "Example 8",
		"description": "An example"  
	    },
	  	{
	    "category": "D",                                                       
		"title": "Example 9",
		"description": "An example"  
	    },
	  	{
	    "category": "D",                                                       
		"title": "Example 8",
		"description": "An example"  
	    }
		
		]
});