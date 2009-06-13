LabeleddividersExampleAssistant = Class.create( ExampleAssistantBase, {
	setup : function($super){
		$super();
		this.examplesModel = {listTitle: $L('Examples'), items:this.kExamples};
		this.controller.setupWidget('examples', 
									{
										itemTemplate: 'example',
										dividerTemplate: 'divider',
										dividerFunction: this.exampleCategory,
										renderLimit: 80
									},
									this.examplesModel);
		},
		exampleCategory : function(modelItem) {
			return modelItem.category;
		},
		kExamples : [
		//scene basics
	  	{
	    "category": "Section 1",                                                       
		"title": "Example 1",
		"description": "An example"  
	    },
	  	{
	    "category": "Section 1",                                                       
		"title": "Example 2",
		"description": "An example"  
	    },
	  	{
	    "category": "Section 2",                                                       
		"title": "Example 3",
		"description": "An example"  
	    },
	  	{
	    "category": "Section 2",                                                       
		"title": "Example 4",
		"description": "An example"  
	    },
	  	{
	    "category": "Section 3",                                                       
		"title": "Example 5",
		"description": "An example"  
	    },
	  	{
	    "category": "Section 3",                                                       
		"title": "Example 6",
		"description": "An example"  
	    },
	  	{
	    "category": "Section 3",                                                       
		"title": "Example 7",
		"description": "An example"  
	    },
	  	{
	    "category": "Section 4",                                                       
		"title": "Example 8",
		"description": "An example"  
	    },
	  	{
	    "category": "Section 4",                                                       
		"title": "Example 9",
		"description": "An example"  
	    },
	  	{
	    "category": "Section 4",                                                       
		"title": "Example 8",
		"description": "An example"  
	    },
		
		]
});
