'use strict';

angular.
  module('sceneEditor').
  component('sceneEditor', {
    templateUrl: 'scene-editor/scene-editor.template.html',
    controller: ['sceneRepositoryService',
      function SceneEditorController(sceneRepositoryService) {
        var ctrl = this;
        ctrl.scenes = [];
        sceneRepositoryService.getScenes().then(function(scenes) {
          ctrl.scenes = scenes;
        });
        ctrl.assignScene = function(id, type) {
          var scene = ctrl.scenes.find(function(scene) { return scene.id == id; })
          if (scene) {
            scene.type = type;
          }
          sceneRepositoryService.saveScenes(ctrl.scenes);
        };
        ctrl.isUnassigned = function(scene) {
          return scene.type != 'live' && scene.type != 'jingle';
        }
      }
    ]
  });
