'use strict';

// This services provides a repository of scene definitions.
angular.module('scenes').factory('sceneRepositoryService', ['settingsService', '$http',
  function(settingsService, $http) {
    return {
      // reads the scenes from the backend
      // extracts the list of scenes from a wrapper object
      // returns a promise
      scenes: function() {
        return $http.get(settingsService.backendApiUrl + '/settings').then(function(response) {
          return response.data.scenes;
        }, function(response) {
          console.log('Error while loading scenes:' + JSON.stringify(response));
        })
      }
    };
  }
]);
