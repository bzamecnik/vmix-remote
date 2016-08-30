'use strict';

angular.module('scenes').factory('settingsService', function() {
  return {
    // vmixApiUrl: "http://lenka-thinkpad.local:8088/api/",
    vmixApiUrl: "/vmix",
    backendApiUrl: "http://bza-mcbp.local:5000/vmix-remote"
  };
});
