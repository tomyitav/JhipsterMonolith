(function() {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .controller('TrainDeleteController',TrainDeleteController);

    TrainDeleteController.$inject = ['$uibModalInstance', 'entity', 'Train'];

    function TrainDeleteController($uibModalInstance, entity, Train) {
        var vm = this;

        vm.train = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Train.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
