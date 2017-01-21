(function () {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig ($stateProvider) {
        $stateProvider.state('map', {
            parent: 'app',
            url: '/map',
            data: {
                authorities: [],
            },
            views: {
                'content@': {
                    templateUrl: 'app/map/map.html',
                    controller: 'MapController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
