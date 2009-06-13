function StageAssistant() {
}

StageAssistant.prototype.setup = function() {
  this.controller.pocketsTemplatePath = '';
  this.controller.pocketsDocumentPath = 'app/views';
  this.controller.pushScene('test');

}
