'use strict';

angular.module('vmix', ['settings', 'xml'])
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('xmlHttpInterceptor');
  });
