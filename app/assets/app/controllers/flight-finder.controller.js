(function () {
    'use strict';

    angular.module('app').controller('flightFinderCtrl', flightFinderCtrl);

    flightFinderCtrl.$inject = ['airportFactory', 'airportService'];
    
    /* @ngInject */
    function flightFinderCtrl(airportFactory, airportService) {
        /* jshint validthis: true */
        var vm = this;
        vm.flight = {};
        
        vm.onFromSelect = function (item) {
            vm.flight.fromCode = item.iataCode;
        };
        
        vm.onToSelect = function (item) {
            vm.flight.toCode = item.iataCode;
        };

        vm.init = function () {
            airportFactory.getAirports().then(function (response) {
                vm.airports = response;
            });
        };
        
        vm.searchFlights = function (flight) { 
            var fromValidation = airportService.verifyCity(flight.from, vm.airports);
            var toValidation = airportService.verifyCity(flight.to, vm.airports);
            vm.error = {};
            
            if(!fromValidation.exist || fromValidation.iataCode !== flight.fromCode) {
                vm.error.from = 'Airport from not exist.';
                return;
            }
            if(!toValidation.exist || toValidation.iataCode !== flight.toCode) {
                vm.error.to = 'Destination airport not exist.';
                return;
            }
            
            airportFactory.searchFlights(flight).then(function (response) {
                delete vm.error;
                vm.showResults = true;
                vm.cheapFlights = response;
                console.log(vm.cheapFlights);
            }, function (reason) {
                vm.error = reason;
            });
        };
        
        vm.popup1 = {
            opened: false
        };
        
        vm.popup2 = {
            opened: false
        };
        
        vm.open1 = function () {
            vm.popup1.opened = true;
        };
        
        vm.open2 = function () {
            vm.popup2.opened = true;
        };
        
        vm.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };

        vm.init();
    }
})();