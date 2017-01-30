(function() {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .controller('MapController', MapController);

    MapController.$inject = ['Principal', 'Auth', 'JhiLanguageService', '$translate', '$http', '$state'];

    function MapController (Principal, Auth, JhiLanguageService, $translate, $http, $state) {
        var vm = this;

        function addPinToView(pinBuilder) {
            var bluePin = vm.viewer.entities.add({
                name: 'Blank blue pin',
                position: Cesium.Cartesian3.fromDegrees(35, 32),
                billboard: {
                    image: pinBuilder.fromColor(Cesium.Color.ROYALBLUE, 48).toDataURL(),
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                }
            });
            return bluePin;
        }

        function initializeCesium() {
            var west = 31.5;
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

            var bluePin = addPinToView(pinBuilder);
            var handler = new Cesium.ScreenSpaceEventHandler(vm.viewer.scene.canvas);
            handler.setInputAction(function (click) {
                console.log('Clicked!');
                $state.go('car.new');
            }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK)

            var handler1 = new Cesium.ScreenSpaceEventHandler(vm.viewer.scene.canvas);
            handler1.setInputAction(function(click) {
                var pickedObject = vm.viewer.scene.pick(click.position);
                if (Cesium.defined(pickedObject)) {
                    console.log('Clicked pin');
                }
            } , Cesium.ScreenSpaceEventType.LEFT_CLICK);

            Cesium.when.all([bluePin], function(pins){
                vm.viewer.zoomTo(pins);
            });

        }

        initializeCesium();
    }
})();
