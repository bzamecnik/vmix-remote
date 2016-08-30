'use strict';

angular.module('scenes').factory('vmixService', ['$http', 'settingsService',
  function($http, settingsService) {
    return {
      online: false,
      refreshing: false,
      refresh: function () {
        var service = this;
        service.refreshing = true;
        $http({
          method: 'GET',
          url: settingsService.vmixApiUrl + "/example-state.xml"
        }).then(function(response) {
          service.statusXml = response.data;
          service.online = true;
          service.refreshing = false;
        }, function(response) {
          service.statusXml = undefined;
          service.online = false;
          service.refreshing = false;
        });
      }
    };
  }
]);
