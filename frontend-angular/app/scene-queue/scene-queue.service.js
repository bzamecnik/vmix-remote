'use strict';

// This service allows to share the scene queue state across the application.
angular.module('sceneQueue').factory('sceneQueueService', function() {
  // A simple queue with unique values.
  var values = [];
  return {
    "values": function() {
      return values;
    },
    "enqueue": function(value) {
      if (values.indexOf(value) < 0) {
        values.push(value);
      }
    },
    "dequeue": function() {
      if (values.length > 0) {
        var value = values[0];
        values = values.slice(1);
        return value;
      }
    }
  };
});
