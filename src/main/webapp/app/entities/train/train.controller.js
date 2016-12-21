(function() {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .controller('TrainController', TrainController);

    TrainController.$inject = ['$scope', '$state', 'Train'];

    function TrainController ($scope, $state, Train) {
        var vm = this;

        vm.trains = [];

        loadAll();

        function loadAll() {
            Train.query(function(result) {
                vm.trains = result;
                vm.searchQuery = null;
            });
        }
    }
})();
