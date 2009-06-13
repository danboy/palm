AddRemoveRowsExampleAssistant = Class.create( ExampleAssistantBase, {
	setup: function($super) {
		$super();
		this.cheesesModel = {listTitle:$L('Cheeses'), items:this.cheeseItems};
		this.innerListAttrs = {
				listTemplate:'add-remove-rows-example/listContainer', 
				itemTemplate:'add-remove-rows-example/listItem',
				addItemLabel:$L("Add..."),
				swipeToDelete:true,
				autoconfirmDelete:false,
				deletedProperty: 'swiped',
				
			};
		this.controller.setupWidget('innerList', this.innerListAttrs, this.cheesesModel);
		this.controller.listen('innerList', Mojo.Event.listTap, this.listTapHandler.bindAsEventListener(this));
		this.controller.listen('innerList', Mojo.Event.listAdd, this.listAddHandler.bindAsEventListener(this));
		this.controller.listen('innerList', Mojo.Event.listDelete, this.listDeleteHandler.bindAsEventListener(this));
	},
	listDeleteHandler: function(event) {
		// Remove the item from the model's list.
		// Warning: By not checking which model we're modifying here, we implicitly assume that they share the same structure.
		event.model.items.splice(event.model.items.indexOf(event.item), 1);
	},
	listTapHandler: function(event) {
		
		if(Element.hasClassName(event.originalEvent.target, 'list-item-remove-button')) {
			console.log("Removing word "+event.item.data);
			
			// Warning: By not checking which model we're modifying here, we implicitly assume that they share the same structure.
			var index = event.model.items.indexOf(event.item);
			if(index > -1) {
				event.model.items.splice(index, 1);
				this.controller.modelChanged(event.model, this);
			}
			
		}
		
	},
	listAddHandler: function(event) {
		// If 'item' and 'index' are undefined, then the 'add...' item was tapped, and we add a "new/blank" item.
		event.model.items.push({data:$L('New Item') });
		this.controller.modelChanged(event.model, this);
	},
	cheeseItems: [
				{data:$L("Brie"), definition:$L("yum")},
				{data:$L("Cheddar"), definition:$L("yum")},
				{data:$L("Roquefort"), definition:$L("yum")},
				{data:$L("Wensleydale"), definition:$L("yum")}
	]
});