'use strict';

angular.module('scenes').factory('settingsService', function() {
  return {
    vmixApiUrl: "http://lenka-thinkpad.local:8088/api/",
    backendApiUrl: "http://localhost:5000/"
  };
});
