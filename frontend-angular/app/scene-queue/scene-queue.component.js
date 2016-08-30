'use strict';

(function() {
  angular.
    module('sceneQueue').
    component('sceneQueue',  {
      templateUrl: 'scene-queue/scene-queue.template.html',
      controller: ['sceneQueueService',
      function SceneQueueController(sceneQueueService) {
        this.scenes = [
          {"id": 0, "title": "live piano stream"},
          {"id": 1, "title": "please stand by"},
          {"id": 2, "title": "youtube jingle"},
          {"id": 3, "title": "twitch jingle"},
          {"id": 4, "title": "facebook jingle"}
        ];
        this.values = sceneQueueService.values;
        this.dequeued = undefined;
        this.enqueue = sceneQueueService.enqueue;
        this.dequeue = function() {
          this.dequeued = sceneQueueService.dequeue();
        };
      }]
    });
})();
