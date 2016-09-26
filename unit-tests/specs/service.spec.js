'use strict';
/* globals describe, beforeEach, afterEach, inject, it, expect, done  */
describe('app service', function() {
    /* jshint maxlen: 1000 */
    var cheapFlightData = [ { dateFrom: '2016-09-27T15:07:29.083Z', dateTo: '2016-09-28T22:25:41.589Z', currency: '€', price: 66.19717872142792 }, { dateFrom: '2016-10-02T06:12:42.709Z', dateTo: '2016-10-05T22:42:23.716Z', currency: '€', price: 299.377319984138 }, { dateFrom: '2016-10-01T01:42:56.564Z', dateTo: '2016-10-02T03:37:03.478Z', currency: '€', price: 146.59385431930423 }, { dateFrom: '2016-10-08T09:32:45.648Z', dateTo: '2016-10-08T14:49:03.711Z', currency: '€', price: 329.59778543934226 }, { dateFrom: '2016-09-27T03:17:35.017Z', dateTo: '2016-09-29T23:37:32.261Z', currency: '€', price: 208.3786299675703 } ];
    var cheapFlightExtendedData = [ { dateFrom: '2016-09-27T15:07:29.083Z', dateTo: '2016-09-28T22:25:41.589Z', currency: '€', price: 66.19717872142792, from: 'Aarhus', to: 'Amsterdam' }, { dateFrom: '2016-10-02T06:12:42.709Z', dateTo: '2016-10-05T22:42:23.716Z', currency: '€', price: 299.377319984138, from: 'Aarhus', to: 'Amsterdam' }, { dateFrom: '2016-10-01T01:42:56.564Z', dateTo: '2016-10-02T03:37:03.478Z', currency: '€', price: 146.59385431930423, from: 'Aarhus', to: 'Amsterdam' }, { dateFrom: '2016-10-08T09:32:45.648Z', dateTo: '2016-10-08T14:49:03.711Z', currency: '€', price: 329.59778543934226, from: 'Aarhus', to: 'Amsterdam' }, { dateFrom: '2016-09-27T03:17:35.017Z', dateTo: '2016-09-29T23:37:32.261Z', currency: '€', price: 208.3786299675703, from: 'Aarhus', to: 'Amsterdam' } ];
    var airportService = {};
    var airportFactory = {};
    var $httpBackend;
    var $exceptionHandler;
    
    var flight = {
        from: 'Aarhus',
        fromCode: 'AAR',
        to: 'Amsterdam',
        toCode: 'AMS',
        dateFrom: '2016-09-26',
        dateTo: '2016-10-09',
        price: 400
    };
    
    var expectedUrl = 
            'https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/from/' + 
            flight.fromCode + '/to/' + flight.toCode + '/' + flight.dateFrom + '/' + 
            flight.dateTo + '/' + flight.price + '/unique/?limit=15&offset-0';

    beforeEach(module('app'));

    beforeEach(module(function($exceptionHandlerProvider) {
        $exceptionHandlerProvider.mode('log');
    }));

    beforeEach(inject(function(_airportService_, _airportFactory_, _$httpBackend_, _$exceptionHandler_) {
        airportService = _airportService_;
        airportFactory = _airportFactory_;
        $httpBackend = _$httpBackend_;
        $exceptionHandler = _$exceptionHandler_;
    }));
    
    it('should return the cheapest flight promise', function () {
        expect(airportFactory.searchFlights(flight).then).toBeDefined();
    });
    
    it('should resolve with different the cheapest flights', function () {
        var responseData;
            
        $httpBackend.when('GET', expectedUrl).respond(cheapFlightData);
        airportFactory.searchFlights(flight).then(function(response) {
            responseData = response;
        });
              
        $httpBackend.flush();
        expect(responseData).not.toEqual(cheapFlightData);
    });
    
    it('should handle not found error', function () {
        var responseData;
        
        $httpBackend.when('GET', expectedUrl).respond(404);
        airportFactory.searchFlights(flight).then(function(response) {
            responseData = response;
        }).catch(function() {
            responseData = 'Not Found';
        });
        
        $httpBackend.flush();
        expect(responseData).toEqual('Not Found');
    });

    it('should return extended the cheapest flights parameters', function(){
        var responseData;

        responseData = airportService.extendFlights(cheapFlightData, flight.from, flight.to);
        
        expect(responseData).toEqual(cheapFlightExtendedData);
    });
    
});