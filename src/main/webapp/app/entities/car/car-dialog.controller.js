(function() {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .controller('CarDialogController', CarDialogController);

    CarDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Car', 'Principal'];

    function CarDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Car, Principal) {
        var vm = this;

        vm.car = entity;
        vm.clear = clear;
        vm.save = save;

        Principal.identity().then(function (user) {
            var data = {
                user: user.login
            };
            vm.car.userid = data.user;
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.car.id !== null) {
                Car.update(vm.car, onSaveSuccess, onSaveError);
            } else {
                Car.save(vm.car, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('jhipstermonolithApp:carUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

    }
})();
