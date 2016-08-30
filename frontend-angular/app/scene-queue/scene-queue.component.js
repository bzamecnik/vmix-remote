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
        this.enqueue = function(value) { sceneQueueService.enqueue(value); };
        this.dequeue = function() {
          this.dequeued = sceneQueueService.dequeue();
        };
        this.isEnqueued = sceneQueueService.contains;
      }]
    });
})();
