(function() {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .controller('MapController', MapController);

    MapController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate', '$http'];

    function MapController (Principal, Auth, JhiLanguageService, $translate, $http) {
        var vm = this;
    }
})();
