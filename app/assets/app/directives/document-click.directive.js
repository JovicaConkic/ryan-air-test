(function () {
    'use strict';

    angular.module('app').directive('documentClick', documentClick);

    documentClick.$inject = ['$document', '$parse'];
    
    /* @ngInject */
    function documentClick($document, $parse) {
        /* jshint validthis: true */
         var linkFunction = function( $scope, $element, $attributes ){
             
            var scopeExpression = $attributes.documentClick;

            var invoker = $parse(scopeExpression);
            // Bind to the document click event.
            function handler(event){
                $scope.$apply(
                    function(){
                        invoker($scope, { $event: event });
                    }
                );
            }
            $document.on('click', handler);
            $scope.$on('$destroy', function () {
                $document.off('click', handler);
            });
        };
        // Return the linking function.
        return(linkFunction);
    }
})();