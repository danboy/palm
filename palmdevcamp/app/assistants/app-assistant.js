function AppAssistant() {
};

AppAssistant.prototype.setup = function() {
};

AppAssistant.prototype.handleLaunch = function(launchParams) {
  this.runTests = launchParams['runTests'];
}