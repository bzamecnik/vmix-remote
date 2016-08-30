'use strict';

(function() {
  // A simple queue with unique values.
  function Queue() {
    return {
      "values": [],
      "enqueue": function(value) {
        if (this.values.indexOf(value) < 0) {
          this.values.push(value);
        }
      },
      "dequeue": function() {
        if (this.values.length > 0) {
          var value = this.values[0];
          this.values = this.values.slice(1);
          return value;
        }
      }
    };
  }
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
        this.queue = Queue();
        this.dequeued = undefined;
        this.enqueue = function(value) {
          this.queue.enqueue(value);
        };
        this.dequeue = function() {
          this.dequeued = this.queue.dequeue();
        };
      }
    });
})();
