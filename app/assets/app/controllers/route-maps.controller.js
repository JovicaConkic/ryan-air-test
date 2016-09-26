(function () {
    'use strict';

    angular.module('app').controller('routeMapsCtrl', routeMapsCtrl);

    routeMapsCtrl.$inject = ['airportFactory', 'airportService'];

    /* @ngInject */
    function routeMapsCtrl(airportFactory, airportService) {
        /* jshint validthis: true */
        var vm = this;
        vm.selected = undefined;
        vm.defaultLatitude = 50.4592;
        vm.defaultLongitude = 4.45382;
        vm.defaultZoom = 4;
        vm.showSearch = true;
        
        vm.onClick = function (marker, eventName, model) {
            model.show = !model.show;
        };
        
        vm.searchAirports = function (city) {
            airportFactory.searchAirports(city).then(function (response) {
                delete vm.error;
                vm.defaultLatitude = response[0].coords.latitude;
                vm.defaultLongitude = response[0].coords.longitude;
                vm.defaultZoom = 10;
                vm.map = {center: {latitude: vm.defaultLatitude, longitude: vm.defaultLongitude}, zoom: vm.defaultZoom};
                vm.markers = response;
                vm.showSearch = false;
            }, function (reason) {
                vm.error = reason;
            });
        };
        
        vm.resetSearch = function (serachForm) {
            serachForm.$setPristine();
            vm.selected = undefined;
            vm.defaultLatitude = 50.4592;
            vm.defaultLongitude = 4.45382;
            vm.defaultZoom = 4;
            vm.showSearch = true;
            vm.init();
        };

        vm.init = function () {
            vm.initMap();
            
            airportFactory.getAirports().then(function (response) {
                vm.markers = response;
            });
        };
        
        vm.initMap = function () {
            vm.map = {center: {latitude: vm.defaultLatitude, longitude: vm.defaultLongitude}, zoom: vm.defaultZoom};
            vm.map.options = {scrollwheel: false, draggable: true, styles: airportService.mapStyle()};

            vm.windowOptions = {
                visible: false
            };
        };
        
        vm.init();
    }
})();