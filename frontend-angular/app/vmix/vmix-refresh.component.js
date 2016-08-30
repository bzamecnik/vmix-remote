'use strict';

angular.
  module('vmix').
  component('vmixRefresh', {
    templateUrl: 'vmix/vmix-refresh.template.html',
    controller: ['vmixService',
      function VmixRefreshController(vmixService) {
        this.vmix = vmixService;
        vmixService.refresh().then(function(){
          console.log(vmixService.scenes());
        });
      }
    ]
  });
