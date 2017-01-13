(function() {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .directive('socialPic', socialPic);

    function socialPic() {
        var directive = {
            restrict: 'E',
            scope: {
                title: '@',
                location: '@'
            },
            templateUrl:"app/account/social/social-pic.html"
        };

        return directive;
    }
})();
