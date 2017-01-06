(function() {
    'use strict';

    angular
        .module('jhipstermonolithApp')
        .directive('searchAdd', searchAdd);

    function searchAdd() {
        var directive = {
            restrict: 'E',
            scope: {
                title: '@',
                tooltip: '@',
                search: '='
            },
            templateUrl:"app/entities/search-add-template.html"
        };

        return directive;
    }
})();
