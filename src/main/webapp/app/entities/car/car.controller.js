(function() {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .controller('CarController', CarController);

    CarController.$inject = ['$scope', '$state', 'Car'];

    function CarController ($scope, $state, Car) {
        var vm = this;

        vm.cars = [];

        loadAll();

        function loadAll() {
            Car.query(function(result) {
                vm.cars = result;
                vm.searchQuery = null;
            });
        }
    }
})();
