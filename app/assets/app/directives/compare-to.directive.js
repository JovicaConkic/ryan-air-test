(function () {
    'use strict';

    angular.module('app').directive('compareTo', compareTo);

    compareTo.$inject = [];
    
    /* @ngInject */
    function compareTo() {
        /* jshint validthis: true */
        return {
            require: 'ngModel',
            scope: {
                otherModelValue: '=compareTo'
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return  modelValue !== scope.otherModelValue ? true : false;
                };

                var unbindWatcher = scope.$watch('otherModelValue', function(newVal, oldVal) {
                    ngModel.$validate();
                });
                
                scope.$on('$destroy', function () {
                    unbindWatcher();
                });
            }
        };
    }
})();