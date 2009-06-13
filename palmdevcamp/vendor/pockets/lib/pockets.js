var realPockets = function (config) {

  var pocketsAPI = {
//    publisher: new PubSubBroker(config.signals),

    listWidget:  function (options) {
      var that = {

        list: {listTitle: options.title, items: []},

        updateModelWithFunction: function (updateFunc) {
          updateFunc(that.list);
          options.assistant.controller.modelChanged(that.list, options.assistant);
        },

        addItemToList: function (item) {
          that.updateModelWithFunction(function(list) {
            list.items.push(item);
          });
        }

      };

      //Init listWidget

      if (options.parentElement) {
        options.parentElement.appendChild(new Element('div', {
          'id': options.widgetId,
          'x-mojo-element': "List"
        }));
      }

      options.assistant.controller.setupWidget(options.widgetId, {
        listTemplate: options.listTemplate,
        itemTemplate: options.itemTemplate
      }, that.list);
      if (options.parentElement) {
        options.assistant.controller.instantiateChildWidgets(options.parentElement);
      }

      return that;
    },

    createSceneController: function(spec, sceneId ) {
      var fakeSceneElement = Mojo.View.convertToNode('<div id="mojo-scene-' + sceneId + '-scene-scroller" x-mojo-element="Scroller" style="overflow-x: hidden; overflow-y: hidden; position: relative; height: 545px; display: none; "><div id="mojo-scene-' + sceneId + '" >' + Mojo.View.render({template : sceneId + '/' + sceneId + '-scene'}) + '</div></div>', document);
      window.frames['test-frame'].document.body.appendChild(fakeSceneElement);
      var sceneArguments = {name: sceneId, disableSceneScroller: true};
      var stageController = { window: window.frames['test-frame'] };  //stageController must contain a reference to a window.


      var assistantArguments = [];
      for (var i = 2; i < arguments.length; i++) {
        assistantArguments.push(arguments[i]);
      }
      var sceneController = new Mojo.Controller.SceneController(stageController, fakeSceneElement, sceneArguments, assistantArguments);

      sceneController.setup();
      sceneController.activate();

      spec.after(function() {
        sceneController.deactivate();
        sceneController.cleanup();
      });

      return sceneController;
    },

    createSceneAssistant: function(spec, sceneId, assistantVarargs) {
      return Pockets.createSceneController(spec, sceneId, assistantVarargs).assistant;
    }
  };

  return pocketsAPI;
};

var Pockets = realPockets({});