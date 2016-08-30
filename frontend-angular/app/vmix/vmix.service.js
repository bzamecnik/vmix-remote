'use strict';

angular.module('scenes').factory('vmixService',
  ['$http', 'x2js', 'settingsService',
  function($http, x2js, settingsService) {
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
