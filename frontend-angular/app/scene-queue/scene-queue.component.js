'use strict';

(function() {
  angular.
    module('sceneQueue').
    component('sceneQueue',  {
      templateUrl: 'scene-queue/scene-queue.template.html',
      controller: ['sceneQueueService', 'sceneRepositoryService',
      function SceneQueueController(sceneQueueService, sceneRepositoryService) {
        var ctrl = this;
        sceneRepositoryService.scenes.then(function(scenes) {
          ctrl.scenes = scenes;
        });
        ctrl.values = sceneQueueService.values;
        ctrl.dequeued = undefined;
        ctrl.enqueue = function(value) { sceneQueueService.enqueue(value); };
        ctrl.dequeue = function() {
          ctrl.dequeued = sceneQueueService.dequeue();
        };
        ctrl.isEnqueued = sceneQueueService.contains;
      }]
    });
})();
