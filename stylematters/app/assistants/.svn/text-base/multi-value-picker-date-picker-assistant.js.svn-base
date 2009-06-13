MultiValuePickerDatePickerAssistant = Class.create( ExampleAssistantBase, {
	setup : function($super){
		$super();
		// The date & time picker widgets can be used to edit a Date object in the widget model.
		this.pickerModel = {time:new Date(), myValue:42};
		
		// The date picker defaults to using the 'date' model property.
		// We change it to 'time' here, so it will edit the same object as the time picker.
		this.controller.setupWidget('datepicker', {modelProperty:'time'}, this.pickerModel);
	}
});