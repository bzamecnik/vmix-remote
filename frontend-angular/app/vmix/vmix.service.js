'use strict';

angular.module('scenes').factory('vmixService',
  ['$http', 'x2js', 'settingsService',
  function($http, x2js, settingsService) {
    function extractScenes(vmixStatus) {
      if (!vmixStatus) {
        return;
      }
      var previewSceneId = vmixStatus['vmix']['preview'];
      var activeSceneId = vmixStatus['vmix']['active'];
      var scenes = vmixStatus['vmix']['inputs']['input'].map(function(input) {
        var id = input['_number'];
        return {
          id: id,
          title: input['_title'],
          duration: parseInt(input['_duration']),
          position: parseInt(input['_position']),
          state: input['_state'],
          preview: id == previewSceneId,
          active: id == activeSceneId
        }
      });
      return scenes;
    }
    return {
      online: false,
      refreshing: false,
      scenes: function() {
        return extractScenes(this.status);
      },
      refresh: function () {
        var service = this;
        service.refreshing = true;
        return $http({
          method: 'GET',
          url: settingsService.vmixApiUrl + "/example-state.xml"
        }).then(function(response) {
          // XML automatically converted to JSON using the X2JS interceptor
          service.status = response.data;
          service.online = true;
          service.refreshing = false;
        }, function(response) {
          service.status = undefined;
          service.online = false;
          service.refreshing = false;
        });
      }
    };
  }
]);
