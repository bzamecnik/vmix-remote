'use strict';

angular.
  module('sceneEditor').
  component('sceneEditor', {
    templateUrl: 'scene-editor/scene-editor.template.html',
    controller: ['sceneRepositoryService',
      function SceneEditorController(sceneRepositoryService) {
        var ctrl = this;
        ctrl.scenes = sceneRepositoryService.scenes;
        ctrl.addScene = function(id, title, type) {
          ctrl.scenes.push({
            'id': id,
            'title': title,
            'type': type
          });
        };
      }
    ]
  });
