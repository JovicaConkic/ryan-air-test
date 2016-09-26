(function () {
    'use strict';

    angular.module('app').service('airportService', airportService);

    airportService.$inject = [];

    /* @ngInject */
    function airportService() {
        /* jshint validthis: true */

        this.getMarkers = function (data) {
            var markers = [],
                    object;
            if (data) {
                if (data.constructor === Array) {
                    for (var i = 0; i < data.length; i++) {
                        object = this.fillObject(data[i], i);
                        markers.push(object);
                    }
                } else if (data.constructor === Object) {
                    object = this.fillObject(data, 0);
                    markers.push(object);
                }
            }
            
            return markers;
        };

        this.fillObject = function (data, id) {
            data.coords = {
                latitude: data.latitude,
                longitude: data.longitude,
                city: data.name,
                country: data.country.name
            };
            data.id = id;
            data.options = {
                icon: 'http://maps.google.com/mapfiles/kml/pal2/icon56.png'
            };
            delete data.latitude;
            delete data.longitude;
            delete data.base;
            delete data.country;
            delete data.name;

            return data;
        };
        
        this.verifyCity = function (city, airports) {
            var cityObject = {
                exist: false,
                iataCode: ''
            };
            for (var i = 0; i < airports.length; i++) {
                if (airports[i].coords.city === city) {
                    cityObject.exist = true;
                    cityObject.iataCode = airports[i].iataCode;
                    return cityObject;
                }
            }
            return cityObject;
        };
        
        this.extendFlights = function (flights, from, to) {
            for (var i = 0; i < flights.length; i++) {
                flights[i].from = from;
                flights[i].to = to;
            }
            return flights;
        };

        this.mapStyle = function () {
            return [
                {
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#1d2c4d'
                        }
                    ]
                },
                {
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#8ec3b9'
                        }
                    ]
                },
                {
                    'elementType': 'labels.text.stroke',
                    'stylers': [
                        {
                            'color': '#1a3646'
                        }
                    ]
                },
                {
                    'featureType': 'administrative.country',
                    'elementType': 'geometry.stroke',
                    'stylers': [
                        {
                            'color': '#4b6878'
                        }
                    ]
                },
                {
                    'featureType': 'administrative.land_parcel',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#64779e'
                        }
                    ]
                },
                {
                    'featureType': 'administrative.province',
                    'elementType': 'geometry.stroke',
                    'stylers': [
                        {
                            'color': '#4b6878'
                        }
                    ]
                },
                {
                    'featureType': 'landscape.man_made',
                    'elementType': 'geometry.stroke',
                    'stylers': [
                        {
                            'color': '#334e87'
                        }
                    ]
                },
                {
                    'featureType': 'landscape.natural',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#023e58'
                        }
                    ]
                },
                {
                    'featureType': 'poi',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#283d6a'
                        }
                    ]
                },
                {
                    'featureType': 'poi',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#6f9ba5'
                        }
                    ]
                },
                {
                    'featureType': 'poi',
                    'elementType': 'labels.text.stroke',
                    'stylers': [
                        {
                            'color': '#1d2c4d'
                        }
                    ]
                },
                {
                    'featureType': 'poi.park',
                    'elementType': 'geometry.fill',
                    'stylers': [
                        {
                            'color': '#023e58'
                        }
                    ]
                },
                {
                    'featureType': 'poi.park',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#3C7680'
                        }
                    ]
                },
                {
                    'featureType': 'road',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#304a7d'
                        }
                    ]
                },
                {
                    'featureType': 'road',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#98a5be'
                        }
                    ]
                },
                {
                    'featureType': 'road',
                    'elementType': 'labels.text.stroke',
                    'stylers': [
                        {
                            'color': '#1d2c4d'
                        }
                    ]
                },
                {
                    'featureType': 'road.highway',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#2c6675'
                        }
                    ]
                },
                {
                    'featureType': 'road.highway',
                    'elementType': 'geometry.stroke',
                    'stylers': [
                        {
                            'color': '#255763'
                        }
                    ]
                },
                {
                    'featureType': 'road.highway',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#b0d5ce'
                        }
                    ]
                },
                {
                    'featureType': 'road.highway',
                    'elementType': 'labels.text.stroke',
                    'stylers': [
                        {
                            'color': '#023e58'
                        }
                    ]
                },
                {
                    'featureType': 'transit',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#98a5be'
                        }
                    ]
                },
                {
                    'featureType': 'transit',
                    'elementType': 'labels.text.stroke',
                    'stylers': [
                        {
                            'color': '#1d2c4d'
                        }
                    ]
                },
                {
                    'featureType': 'transit.line',
                    'elementType': 'geometry.fill',
                    'stylers': [
                        {
                            'color': '#283d6a'
                        }
                    ]
                },
                {
                    'featureType': 'transit.station',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#3a4762'
                        }
                    ]
                },
                {
                    'featureType': 'water',
                    'elementType': 'geometry',
                    'stylers': [
                        {
                            'color': '#0e1626'
                        }
                    ]
                },
                {
                    'featureType': 'water',
                    'elementType': 'labels.text.fill',
                    'stylers': [
                        {
                            'color': '#4e6d70'
                        }
                    ]
                }
            ];
        };
    }
})();