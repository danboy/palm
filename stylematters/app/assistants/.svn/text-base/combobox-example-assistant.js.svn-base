ComboboxExampleAssistant = Class.create( ExampleAssistantBase, {
	setup: function($super) {
		$super();
		this.searchList = [];
		this.results = [];
		//create a mojo combo box widget
		var model = new ComboBoxDataSource();
		var element = $('element');

		this.searchList = {
			"hintText" : $L('Hint...'),
			"filterFunction" : this.search.bind(this),
			"template": 'combobox-example/combobox-listitem',
			formatters: {}
		};

    this.controller.setupWidget('searchList', this.searchList);
    $('searchList').observe(Mojo.Event.listTap, this.handleSelection.bindAsEventListener(this));
	},

	handleSelection: function(event) {
    var item = event.item;
    console.log("item "+ event.item);
    $('searchList').mojo.setValue(item.display);
  },

	search: function(filterString, listWidget, offset, count, callback) {
	  this.data = {
	    "list": [{"display":'123', 'bob': 'bob'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'},{"display":'456'}]
	  };          
	  console.log("this was called with filterstring " + filterString);
	  callback(listWidget, offset, this.data.list.slice(offset, offset+count), this.data.list.length);
	},

	itemCreated: function(event, itemModel) {
		console.log("item was created "+ event.item);
	},

	activate: function($super) {
		$super();
		Event.observe('searchList', 'mojo-combobox-search', this.search.bindAsEventListener(this));
		Event.observe('searchList', 'mojo-combobox-selected', this.itemSelected.bindAsEventListener(this));
		Event.observe('searchList', 'mojo-combobox-entered', this.itemEntered.bindAsEventListener(this));
	},

	itemEntered: function(event) {
		var item = event.item;
		alert("got new item " + item);
	},

	itemSelected: function(event) {
		var item = event.item;
		alert("got new item " + item);
	},

	cleanup: function() {

	}
});

ComboBoxDataSource = Class.create( {
	initialize: function() {
		console.log("new");
	},
	
	search: function(text, callback) {
		console.log("search "+text);
		var sample = {
			"count": 5,
			"list": [{
				"id": "1",
				"displayName": "Account1",
				"value": "Account1"
				},
				{
				"id": "2",
				"displayName": "Account2",
				"value": "Account2"
				},
				{
				"id": "3",
				"displayName": "Account3",
				"value": "Account3"
				},
				{
				"id": "4",
				"displayName": "Account4",
				"value": "Account4"
				},
				{
				"id": "5",
				"displayName": "Account5",
				"value": "Account5"
				}
			]
		};
		callback(sample);
		return null;
	}
});