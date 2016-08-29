'use strict';

angular.
  module('sceneEditor').
  component('sceneEditor', {
    templateUrl: 'scene-editor/scene-editor.template.html',
    controller: function SceneEditorController() {
      this.scenes = [
        {"id": 0, "title": "live piano stream"},
        {"id": 1, "title": "please stand by"},
        {"id": 2, "title": "youtube jingle"},
        {"id": 3, "title": "twitch jingle"},
        {"id": 4, "title": "facebook jingle"}
      ];
    }
  });
