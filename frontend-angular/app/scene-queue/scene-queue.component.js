'use strict';

(function() {
  angular.
    module('sceneQueue').
    component('sceneQueue',  {
      templateUrl: 'scene-queue/scene-queue.template.html',
      controller: ['sceneQueueService', 'sceneRepositoryService',
      function SceneQueueController(sceneQueueService, sceneRepositoryService) {
        this.scenes = sceneRepositoryService.scenes;
        this.values = sceneQueueService.values;
        this.dequeued = undefined;
        this.enqueue = sceneQueueService.enqueue;
        this.dequeue = function() {
          this.dequeued = sceneQueueService.dequeue();
        };
      }]
    });
})();
