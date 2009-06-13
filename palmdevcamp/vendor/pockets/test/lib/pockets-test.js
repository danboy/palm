describe('Pockets.ListWidget', function () {

  beforeEach(function () {
    this.assistant = {controller: amok.mock(Mojo.Controller.SceneController) }
  });

  it('should call setupWidget with the appropriate arguments to setup a widget whose Element should already exist in the DOM', function() {
    runs(function () {
      this.assistant.controller.should_receive('setupWidget').with_args('foo', {listTemplate: 'bar', itemTemplate: 'baz'}, {items: [], listTitle:'corge'});

      var widget = Pockets.listWidget({assistant: this.assistant, listTemplate: 'bar', itemTemplate: 'baz', widgetId: 'foo', title:'corge'});

      this.expects_that(this.assistant.controller.getCallCountFor('setupWidget')).should_equal(1);

    });
  });

  it('should, given a parent element, insert an element into that DOM, then call widgetSetup & instantiateChildWidgets with the appropriate parameters', function() {
    runs(function () {
      var sceneDOM = Mojo.View.convertToNode('<div id="main"><div id="parentElement"></div></div>', document);
      var parentElement = sceneDOM.querySelector('#parentElement');

      this.assistant.controller.should_receive('setupWidget').with_args('foo', {listTemplate: 'bar', itemTemplate: 'baz'}, {items: [], listTitle:'corge'});
      this.assistant.controller.should_receive('instantiateChildWidgets').with_args(parentElement);

      var widget = Pockets.listWidget({assistant: this.assistant,
        parentElement: parentElement,
        listTemplate: 'bar',
        itemTemplate: 'baz',
        widgetId: 'foo',
        title: 'corge'}
          );

      this.expects_that(this.assistant.controller.getCallCountFor('setupWidget')).should_equal(1);
      this.expects_that(this.assistant.controller.getCallCountFor('instantiateChildWidgets')).should_equal(1);

      var widgetHTML = sceneDOM.querySelector('#foo');
      this.expects_that(widgetHTML).should_not_equal(null);


    });
  });


  it('should have a method updateModelWithFunction that takes a function, applies it to the model, and then calls modelChanged', function() {
    runs(function () {
      this.assistant.controller.should_receive('setupWidget');
      this.assistant.controller.should_receive('instantiateChildWidgets');
      this.assistant.controller.should_receive('modelChanged').with_args({listTitle:'corge', items: ['foo']}, this.assistant);
      this.assistant.controller.should_receive('modelChanged').with_args({listTitle:'corge', items: ['bar']}, this.assistant);

      var widget = Pockets.listWidget({assistant: this.assistant, listTemplate: 'bar', itemTemplate: 'baz', widgetId: 'foo', title:'corge'});


      var updateFunc = function(model) {
        model.items[0] = 'foo';
      }

      widget.updateModelWithFunction(updateFunc);

      var updateFunc2 = function(model) {
        model.items[0] = 'bar';
      }

      widget.updateModelWithFunction(updateFunc2);

      this.expects_that(this.assistant.controller.getCallCountFor('modelChanged')).should_equal(2);
    });
  });

  it('should have a method addItemToList that adds an item to the end of the list of the model items array', function() {
    runs(function () {
         this.assistant.controller.should_receive('setupWidget');
      this.assistant.controller.should_receive('instantiateChildWidgets');
      this.assistant.controller.should_receive('modelChanged').with_args({listTitle:'corge', items: ['foo']}, this.assistant);
      this.assistant.controller.should_receive('modelChanged').with_args({listTitle:'corge', items: ['foo', 'bar']}, this.assistant);

      var widget = Pockets.listWidget({assistant: this.assistant, listTemplate: 'bar', itemTemplate: 'baz', widgetId: 'foo', title:'corge'});

      widget.addItemToList('foo');
      widget.addItemToList('bar');

      this.expects_that(this.assistant.controller.getCallCountFor('modelChanged')).should_equal(2);
    });
  });


});