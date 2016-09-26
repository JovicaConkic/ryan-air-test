'use strict';
/* globals describe, browser, beforeEach, it, expect, element, by  */
describe('Ryanair Project', function() {
    
    it('Should automatically redirect to / when location hash/fragment is empty', function() {
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toMatch('/');
    });
    
    describe('Application Title', function() {
        beforeEach(function() {
            browser.get('index.html');
        });
        it('Should display the correct title', function() {
            expect(browser.getTitle()).toEqual('Ryanair Project');
        });
    });
    
    describe('Route maps', function() {
        beforeEach(function() {
            browser.get('/route-maps');
        });
        it('Should render route maps view when user navigates to /route-maps', function() {
            expect(element.all(by.css('[ng-view] h1')).first().getText()).toMatch(/Route maps/);
        });
    });
    
    describe('Cheap flight finder', function() {
        beforeEach(function() {
            browser.get('/flight-finder');
        });
        it('Should render flight finder view when user navigates to /flight-finder', function() {
            expect(element.all(by.css('[ng-view] h1')).first().getText()).toMatch(/Cheap flight finder/);
        });
    });
});