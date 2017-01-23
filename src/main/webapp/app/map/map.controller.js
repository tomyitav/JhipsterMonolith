(function() {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .controller('MapController', MapController);

    MapController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate', '$http'];

    function MapController (Principal, Auth, JhiLanguageService, $translate, $http) {
        var vm = this;

        function initializeCesium() {
            var west = 32.0;
            var south = 27.0;
            var east = 34.0;
            var north = 35.0;
            var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);
            Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
            Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;

            var pinBuilder = new Cesium.PinBuilder();

            vm.viewer = new Cesium.Viewer('cesiumContainer', {
                fullscreenButton: false,
                timeline: false,
                animation: false
            });

            var bluePin = vm.viewer.entities.add({
                name : 'Blank blue pin',
                position : Cesium.Cartesian3.fromDegrees(35, 32),
                billboard : {
                    image : pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
                    verticalOrigin : Cesium.VerticalOrigin.BOTTOM
                }
            });

            Cesium.when.all([bluePin], function(pins){
                vm.viewer.zoomTo(pins);
            });

        }

        initializeCesium();
    }
})();
