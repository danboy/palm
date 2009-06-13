function StageAssistant() {
}

StageAssistant.prototype.setup = function() {

  if (this.controller.getAppController().assistant.runTests) {
    this.controller.pocketsTemplatePath = '../../vendor/pockets/app/views/';
    this.controller.pocketsDocumentPath = 'vendor/pockets/app/views';
    this.controller.pushScene({name:'test', sceneTemplate:'../../vendor/pockets/app/views/test/test-scene'});
    return;
  }

  this.controller.pushScene('sample');
}
