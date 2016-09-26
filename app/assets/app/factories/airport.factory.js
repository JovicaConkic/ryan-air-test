(function () {
    'use strict';

    angular.module('app').factory('airportFactory', airportFactory);

    airportFactory.$inject =
            ['$http', '$q', 'envPackage', 'airportService', '$sessionStorage'];

    /* @ngInject */
    function airportFactory($http, $q, envPackage, airportService, $sessionStorage) {
        /* jshint validthis: true */
        var apiPath = envPackage.apiPath;
        
        var _getAirports = function () {
            var deferred = $q.defer();
            if($sessionStorage.airports && $sessionStorage.airports.length !== 0) {
                deferred.resolve($sessionStorage.airports);
            } else {
                var $promise = $http.get(apiPath + '/forms/flight-booking-selector/');
                $promise.then(function (response) {
                    var data = airportService.getMarkers(response.data.airports);
                    $sessionStorage.airports = data;
                    deferred.resolve(data);
                }, function (errorResponse) {
                    deferred.reject(errorResponse);
                });
            }
            return deferred.promise;
        };
        
        var _searchAirports = function (city) {
            var deferred = $q.defer();
            _getAirports().then(function (response) {
                var markers = []; 
                for (var i = 0; i < response.length; i++) {
                    if(response[i].coords.city === city) {
                        markers.push(response[i]);
                        deferred.resolve(markers);
                    }
                }
                if(markers.length === 0) {
                    deferred.reject('Airport not found for city ' + city);
                }
            });
            return deferred.promise;
        };
        
        var _searchFlights = function (flight) {
            var deferred = $q.defer();
            var $promise = $http.get(apiPath + '/flights/from/' + 
                    flight.fromCode + '/to/' + flight.toCode + '/' + 
                    flight.dateFrom + '/' + flight.dateTo + '/' + 
                    flight.price + '/unique/?limit=15&offset-0');
            $promise.then(function (response) {
                var data = [];
                if(response.data.flights && response.data.flights.length !== 0) {
                    data = airportService.extendFlights(response.data.flights, flight.from, flight.to);
                }
                deferred.resolve(data);
            }, function (errorResponse) {
                deferred.reject(errorResponse);
            });
            return deferred.promise;
        };
        
        var service = {
            getAirports: _getAirports,
            searchAirports: _searchAirports,
            searchFlights: _searchFlights
        };

        return service;
    }
})();