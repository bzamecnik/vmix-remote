'use strict';

angular.
  module('settings').
  component('settings', {
    templateUrl: 'settings/settings.template.html',
    controller: ['settingsService',
    function SettingsController(settingsService) {
      this.settings = settingsService;
    }
  ]
  });
