(function () {
    'use strict';
    var app = angular.module('app', [
        'ngAnimate',
        'ngRoute',
        'angular-loading-bar',
        'ui.bootstrap',
        'config',
        'ngStorage',
        'ngHamburger',
        'uiGmapgoogle-maps'
    ]);

    app.config(['$routeProvider', '$locationProvider', '$httpProvider', configRoutes]);

    function configRoutes($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'assets/app/views/welcome.html',
                caseInsensitiveMatch: true
            })
            .when('/welcome', {
                templateUrl: 'assets/app/views/welcome.html',
                caseInsensitiveMatch: true
            })
            .when('/route-maps', {
                templateUrl: 'assets/app/views/route-maps.html',
                caseInsensitiveMatch: true,
                controller: 'routeMapsCtrl as vm',
                activetab: 'route-maps'
            })
            .when('/flight-finder', {
                templateUrl: 'assets/app/views/flight-finder.html',
                caseInsensitiveMatch: true,
                controller: 'flightFinderCtrl as vm',
                activetab: 'flight-finder'
            })
            .when('/404', {
                templateUrl: 'assets/app/views/404.html',
                caseInsensitiveMatch: true
            })
            .otherwise({
                redirectTo: '/'
            });
            
        // use the HTML5 History API
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
        
        $httpProvider.interceptors.push('authInterceptorFactory');
        
        // Speed up little bit and simple load optimization
        $httpProvider.useApplyAsync(true);
    }
    
    app.config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
        GoogleMapApi.configure({
            key: 'AIzaSyDrMFKofCriHOPes5_cyKWSKqe0sD6mGVU',
            v: '3.24',
            libraries: 'weather,geometry,visualization'
        });
    }]);

    app.run(['$route', '$rootScope', 'envPackage' , function ($route, $rootScope, envPackage) {
        // Add your functionality for running application
        $rootScope.version = envPackage.version;
        $route.reload();
    }]);
})();