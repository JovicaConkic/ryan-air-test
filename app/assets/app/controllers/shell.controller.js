(function () {
    'use strict';

    angular.module('app').controller('shellCtrl', shellCtrl);

    shellCtrl.$inject = ['$timeout', '$route'];

    function shellCtrl($timeout, $route) {
        /* jshint validthis:true */
        var vm = this;
        
        vm.tgState = false;
        vm.$route = $route;
        vm.toggleSidebar = function (event) {
            var currentTarget = event.currentTarget.activeElement,
                    el = document.getElementsByClassName('hamburger-toggle')[0].firstChild,
                    sidebar = document.getElementById('sidebar');
            if (sidebar.classList.contains('open') && currentTarget !== el) {
                $timeout(function () {
                    angular.element(el).triggerHandler('click');
                }, 0);
            }
        };
    }
})();
