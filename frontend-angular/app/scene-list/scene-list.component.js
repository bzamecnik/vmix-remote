'use strict';

angular.
  module('sceneList').
  component('sceneList', {
    templateUrl: 'scene-list/scene-list.template.html',
    controller: function SceneListController() {
      this.scenes = [
        {"id": 0, "title": "live piano stream"},
        {"id": 1, "title": "please stand by"},
        {"id": 2, "title": "youtube jingle"},
        {"id": 3, "title": "twitch jingle"},
        {"id": 4, "title": "facebook jingle"}
      ];
    }
  });
