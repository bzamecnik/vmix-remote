'use strict';

angular.
  module('vmixRemoteApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/scenes', {
          template: '<scene-list></scene-list>'
        }).
        otherwise('/scenes');
    }
  ]);
