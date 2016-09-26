(function () {
    'use strict';

    angular.module('app').factory('authInterceptorFactory', authInterceptorFactory);

    authInterceptorFactory.$inject = ['$q', '$location'];
    
    /* @ngInject */
    function authInterceptorFactory($q, $location) {
        /* jshint validthis: true */
        var _request = function (config) {
            config.headers = config.headers || {};

            return config;
        };

        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                console.log('Not authorized');
            } else if(rejection.status === 404) {
                $location.path('/404');
            } else if(rejection.status === 500) {
                console.log('Server error');
            }
            return $q.reject(rejection);
        };

        var factory = {
            request: _request,
            responseError: _responseError
        };

        return factory;
    }
})();