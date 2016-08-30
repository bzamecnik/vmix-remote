'use strict';

// This services provides a repository of scene definitions.
angular.module('scenes').factory('sceneRepositoryService', function() {
  var scenes = [
    {"id": 0, "title": "live piano stream"},
    {"id": 1, "title": "please stand by"},
    {"id": 2, "title": "youtube jingle"},
    {"id": 3, "title": "twitch jingle"},
    {"id": 4, "title": "facebook jingle"}
  ];
  return {
    "scenes": scenes
  };
});
