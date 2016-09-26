(function () {
'use strict';
 angular.module('config', [])

.constant('envPackage', {version:'1.0.0',env:'DEV',description:'We are in development!',apiPath:'https://murmuring-ocean-10826.herokuapp.com/en/api/2'})

.value('debug', false)

; })();