(function() {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .controller('CarDeleteController',CarDeleteController);

    CarDeleteController.$inject = ['$uibModalInstance', 'entity', 'Car'];

    function CarDeleteController($uibModalInstance, entity, Car) {
        var vm = this;

        vm.car = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Car.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
