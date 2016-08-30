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
        when('/scene-editor/new', {
          template: '<new-scene></new-scene>'
        }).
        when('/scene-editor/:id/edit', {
          template: '<edit-scene></edit-scene>'
        }).
        otherwise('/scene-queue');
    }
  ]);
