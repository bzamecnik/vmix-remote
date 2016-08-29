'use strict';

angular.
  module('sceneQueue').
  component('sceneQueue', {
    templateUrl: 'scene-queue/scene-queue.template.html',
    controller: function SceneQueueController() {
      this.scenes = [
        {"id": 0, "title": "live piano stream"},
        {"id": 1, "title": "please stand by"},
        {"id": 2, "title": "youtube jingle"},
        {"id": 3, "title": "twitch jingle"},
        {"id": 4, "title": "facebook jingle"}
      ];
    }
  });
