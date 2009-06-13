function FirstAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

FirstAssistant.prototype.setup = function() {
// set the initial total and display it
    this.total=0;
    this.controller.get('count').update(this.total);


// a local object for button attributes
    this.buttonAttributes = {};

// a local object for button model
    this.buttonModel = {
        buttonLabel : 'Plus 1',
        buttonClass : '',
        disabled : false
        };
    this.button2Model = {
        buttonLabel : 'reset',
        buttonClass : '',
        disabled : false
        };
    this.button3Model = {
        buttonLabel : 'Minus 1',
        buttonClass : '',
        disabled : false
        };

// set up the button
    this.controller.setupWidget("MyButton", this.buttonAttributes, this.buttonModel);
    this.controller.setupWidget("MyButton2", this.buttonAttributes, this.button2Model);
    this.controller.setupWidget("MyButton3", this.buttonAttributes, this.button3Model);
// bind the button to its handler
    Mojo.Event.listen(this.controller.get('MyButton'), Mojo.Event.tap, this.handleButtonPress.bind(this));
    Mojo.Event.listen(this.controller.get('MyButton2'), Mojo.Event.tap, this.handleButton2Press.bind(this));
    Mojo.Event.listen(this.controller.get('MyButton3'), Mojo.Event.tap, this.handleButton3Press.bind(this));
}

FirstAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
}


FirstAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

FirstAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as
	   a result of being popped off the scene stack */
}
FirstAssistant.prototype.handleButtonPress = function(event){
// increment the total and update the display
    this.total++;
    this.controller.get('count').update(this.total);
}
FirstAssistant.prototype.handleButton3Press = function(event){
// increment the total and update the display
    this.total--;
    this.controller.get('count').update(this.total);
}

FirstAssistant.prototype.handleButton2Press = function(event){
// increment the total and update the display
    this.total=0;
    this.controller.get('count').update(this.total);
}
