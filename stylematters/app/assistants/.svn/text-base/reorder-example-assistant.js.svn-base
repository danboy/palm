ReorderExampleAssistant = Class.create( ExampleAssistantBase, {
	setup: function($super) {
		$super();
		this.cheesesModel = {listTitle:$L('Cheeses'), items:this.cheeseItems};
		this.innerListAttrs = {
				listTemplate:'reorder-example/listContainer', 
				itemTemplate:'reorder-example/listItem',
				reorderable:true,
				dragDatatype:'words',
			};
		this.controller.setupWidget('innerList', this.innerListAttrs, this.cheesesModel);
	},
	cheeseItems: [
				{data:$L("Brie"), definition:$L("yum")},
				{data:$L("Cheddar"), definition:$L("yum")},
				{data:$L("Cottage"), definition:$L("yum")},
				{data:$L("Edam"), definition:$L("yum")},
				{data:$L("Fontina"), definition:$L("yum")},
				{data:$L("Gorgonzola"), definition:$L("yum")},
				{data:$L("Gouda"), definition:$L("yum")},
				{data:$L("Manchego"), definition:$L("yum")},
				{data:$L("Swiss"), definition:$L("yum")},
				{data:$L("Roquefort"), definition:$L("yum")},
				{data:$L("Wensleydale"), definition:$L("yum")}
	]
});
