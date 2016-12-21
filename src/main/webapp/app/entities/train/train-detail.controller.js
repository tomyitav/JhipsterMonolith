(function() {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .controller('TrainDetailController', TrainDetailController);

    TrainDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Train'];

    function TrainDetailController($scope, $rootScope, $stateParams, previousState, entity, Train) {
        var vm = this;

        vm.train = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('jhipstermonolithApp:trainUpdate', function(event, result) {
            vm.train = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
