OrientationHandlerAssistant = Class.create( CSSTools, {
	
	initialize : function($super){
	  $super();
	},
	
	setup : function($super){
	  $super();
	  if($$('body')[0].hasClassName('palm-dark')){
		console.log('disabling rotate to palm-default');
		this._setOrientation = function(){console.log('doing nothing')};  //do nothing
	  }
	},
	
	deactivate : function($super) {
		$super();
	},
	
	activate : function(){
		this._setOrientation(this._orientation,this.controller);
	},
	
	_setOrientation : function(orientation,controller) {
		if(orientation == 'down'){
			$$('body')[0].addClassName('palm-dark');
			$$('body')[0].removeClassName('palm-default');
		}else if(orientation == 'up'){
			$$('body')[0].removeClassName('palm-dark');
			$$('body')[0].addClassName('palm-default');
		}
    },

	orientationChanged : function(orientation) {
	   	if (this._orientation === orientation) {
	   		return;
	   	}
	   	this._orientation = orientation;
	   	if (this.controller.setWindowOrientation && this.controller.isActive()) {
	   		this.controller.setWindowOrientation(this._orientation);
	   	}
		if(this.controller.isActive()){
			this._setOrientation(this._orientation,this.controller);
		}
	  }
	
});