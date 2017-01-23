(function() {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .controller('MapController', MapController);

    MapController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate', '$http'];

    function MapController (Principal, Auth, JhiLanguageService, $translate, $http) {
        var vm = this;

        var west = 122.0;
        var south = 33.0;
        var east = 126.0;
        var north = 40.0;
        var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);
        Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
        Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;

        vm.viewer = new Cesium.Viewer('cesiumContainer', {
            baseLayerPicker: false,
            fullscreenButton: false,
            vrButton: false,
            infoBox: false,
            timeline: false,
            animation: false
        });
    }
})();
