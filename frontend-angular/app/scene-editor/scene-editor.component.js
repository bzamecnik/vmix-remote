'use strict';

angular.
  module('sceneEditor').
  component('sceneEditor', {
    templateUrl: 'scene-editor/scene-editor.template.html',
    controller: ['sceneRepositoryService',
      function SceneEditorController(sceneRepositoryService) {
        this.scenes = sceneRepositoryService.scenes;
      }
    ]
  });
