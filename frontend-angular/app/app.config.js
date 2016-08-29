'use strict';

angular.
  module('vmixRemoteApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/scene-queue', {
          template: '<scene-queue></scene-queue>'
        }).
        when('/scene-editor', {
          template: '<scene-editor></scene-editor>'
        }).
        otherwise('/scene-queue');
    }
  ]);
