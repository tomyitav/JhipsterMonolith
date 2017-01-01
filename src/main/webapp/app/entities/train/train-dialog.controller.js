(function() {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .controller('TrainDialogController', TrainDialogController);

    TrainDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Train', 'Principal', 'LoginService'];

    function TrainDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Train, Principal, LoginService) {
        var vm = this;

        vm.train = entity;
        vm.clear = clear;
        vm.save = save;

        vm.isAuthenticated = null;
        vm.login = LoginService.open;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.train.userid = account.login;
                console.log(vm.train.userid);
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.train.id !== null) {
                Train.update(vm.train, onSaveSuccess, onSaveError);
            } else {
                Train.save(vm.train, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('jhipstermonolithApp:trainUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        getAccount();
    }
})();
